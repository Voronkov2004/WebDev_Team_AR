// server.js
const express = require("express");
const pool = require("./database");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const upload = multer({ dest: "public/uploads/" });
const port = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: "http://localhost:8080", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

const secret = "your_jwt_secret_here"; // Replace with a secure secret
const maxAge = 60 * 60; // token expiration in seconds

const generateJWT = (id) => {
  return jwt.sign({ id }, secret, { expiresIn: maxAge });
};

app.listen(port, async () => {
  console.log("Server listening on port " + port);

  // Optional: Import posts if needed
  try {
    const { rows } = await pool.query("SELECT COUNT(*) FROM posts");
    if (parseInt(rows[0].count, 10) === 0) {
      await importPosts();
    } else {
      console.log("Posts already exist, skipping import.");
    }
  } catch (error) {
    console.error("Error checking posts count:", error.message);
  }
});

async function importPosts() {
  try {
    const postsFilePath = path.join(__dirname, "../public/data/posts.json");
    const postsData = JSON.parse(fs.readFileSync(postsFilePath, "utf-8"));
    const insertPostQuery = `
      INSERT INTO posts (postauthorname, postauthorpfp, postcreated, posttext, postimage)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;`;

    for (const post of postsData) {
      const pfp = post.postAuthorPFP?.trim() !== "" ? post.postAuthorPFP : null;
      const image = post.postImage?.trim() !== "" ? post.postImage : null;

      await pool.query(insertPostQuery, [
        post.postAuthorName,
        pfp,
        post.postCreated,
        post.postText,
        image,
      ]);
    }
    console.log("Posts imported successfully!");
  } catch (error) {
    console.error("Error importing posts:", error.message);
  }
}

app.post("/auth/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt();
    const bcryptPassword = await bcrypt.hash(password, salt);
    const authUser = await pool.query(
      "INSERT INTO users(email, password) VALUES ($1, $2) RETURNING *",
      [email, bcryptPassword]
    );

    const token = generateJWT(authUser.rows[0].id);
    res
      .status(201)
      .cookie("jwt", token, { httpOnly: true })
      .json({ user_id: authUser.rows[0].id, jwt: token });
  } catch (err) {
    console.error("Error adding user:", err.message);
    res.status(500).json({ message: "Failed to add user" });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({ error: "User is not registered" });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword)
      return res.status(401).json({ error: "Incorrect password" });

    const token = generateJWT(user.rows[0].id);

    // Set cookie and return JWT in response
    res
      .status(200)
      .cookie("jwt", token, { httpOnly: true })
      .json({ message: "Login successful", jwt: token });
  } catch (error) {
    console.error("Error in login:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/auth/logout", (req, res) => {
  res.status(202).clearCookie("jwt").json({ Msg: "cookie cleared" });
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await pool.query("SELECT * FROM posts ORDER BY postid ASC");
    res.status(200).json(posts.rows);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

app.get("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await pool.query("SELECT * FROM posts WHERE postid = $1", [
      id,
    ]);

    if (post.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post.rows[0]);
  } catch (error) {
    console.error("Error fetching post:", error.message);
    res.status(500).json({ error: "Failed to fetch post details" });
  }
});

app.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { posttext } = req.body;

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ error: "No authorization header" });
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret);

    const result = await pool.query(
      "UPDATE posts SET posttext = $1 WHERE postid = $2 RETURNING *",
      [posttext, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating post:", error.message);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    res.status(500).json({ error: "Failed to update post" });
  }
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ error: "No authorization header" });
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret);

    const result = await pool.query(
      "DELETE FROM posts WHERE postid = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error.message);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    res.status(500).json({ error: "Failed to delete post" });
  }
});

app.delete("/posts", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ error: "No authorization header" });
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret);

    await pool.query("DELETE FROM posts");
    res.status(200).json({ message: "All posts deleted." });
  } catch (error) {
    console.error("Error deleting all posts:", error.message);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    res.status(500).json({ error: "Failed to delete posts." });
  }
});

app.get("/auth/authenticate", (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.json({ authenticated: false });
  }

  try {
    jwt.verify(token, secret);
    return res.json({ authenticated: true });
  } catch (error) {
    return res.json({ authenticated: false });
  }
});

app.post("/posts", upload.single("file"), async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ error: "No authorization header" });

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      console.error("JWT verification error:", err.message);
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    const userQuery = await pool.query(
      "SELECT email FROM users WHERE id = $1",
      [decoded.id]
    );
    if (userQuery.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userEmail = userQuery.rows[0].email;
    const userPFP = null; // Optional user PFP logic

    const postText =
      req.body.body && req.body.body.trim() !== "" ? req.body.body : null;
    const postImage = req.file ? req.file.filename : null;

    if (!postText)
      return res.status(400).json({ error: "Post text is required" });

    const insertQuery = `
      INSERT INTO posts (postauthorname, postauthorpfp, postcreated, posttext, postimage)
      VALUES ($1, $2, CURRENT_TIMESTAMP, $3, $4) RETURNING *`;

    const newPost = await pool.query(insertQuery, [
      userEmail,
      userPFP,
      postText,
      postImage,
    ]);

    res.status(201).json(newPost.rows[0]);
  } catch (error) {
    console.error("Error inserting post:", error.message);
    res.status(500).json({ error: "Failed to create post" });
  }
});
