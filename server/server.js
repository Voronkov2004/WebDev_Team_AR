// server.js

//express: Sets up the web server and handles HTTP requests.
//pool: Manages the database connection (using pg).
//cors: Allows cross-origin requests, essential for a separate front-end and back-end setup.
//bcrypt: Used to securely hash and compare passwords.
//cookie-parser: Parses cookies, enabling the storage and retrieval of JWTs from cookies.
//jsonwebtoken: Generates and verifies JWTs for user authentication.
const express = require('express');
const pool = require('./database');
const cors = require('cors')
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


const port = process.env.PORT || 3000;

const app = express();

// cors: Allows requests from the front-end running on http://localhost:8080
app.use(cors({origin: 'http://localhost:8080', credentials: true }));

// The express.json() function is a built-in middleware function in Express. 
// It parses incoming requests with JSON payloads and is based on body-parser.
// cookieParser extracts cookies from incoming requests, which is necessary for handling JWTs stored in cookies.
app.use(express.json());
app.use(cookieParser());

const secret = "gdgdhdbcb770785rgdzqws"; // use a stronger secret
const maxAge = 60 * 60;   //  the token's expiration time in seconds

//  Function creates a JWT containing the user ID as payload
const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: maxAge })
        //jwt.sign(payload, secret, [options, callback]), and it returns the JWT as string
}

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});

// just for testing database connection
app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()'); // Test query
        res.json({ success: true, timestamp: result.rows[0].now });
    } catch (err) {
        console.error('Database connection error:', err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});
    

// Checks if the user is authenticated by verifying the JWT stored in cookies
app.get('/auth/authenticate', async (req, res) => {
    console.log('authentication request has been arrived');
    const token = req.cookies.jwt;
    let authenticated = false;

    try {
        if (!token) {
            console.log('No token provided. User is not authenticated.');
            return res.send({ authenticated: false });
        }
        if (token) { //checks if the token exists
            await jwt.verify(token, secret, (err) => { //token exists, now we try to verify it
                if (err) { // not verified
                    console.log(err.message);
                    console.log('token is not verified');
                    res.send({ "authenticated": authenticated }); // authenticated = false
                } else { // token exists and it is verified
                    console.log('author is authenticated');
                    authenticated = true;
                    res.send({ "authenticated": authenticated }); // authenticated = true
                }
            });
        } else { //applies when the token does not exist
            console.log('author is not authenticated');
            res.send({ "authenticated": authenticated }); // authenticated = false
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

app.post('/auth/signup', async(req, res) => {
    try {
        console.log("a signup request has arrived");
        //console.log(req.body);
        const { email, password } = req.body;


        const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }



        const salt = await bcrypt.genSalt(); //  generates the salt, i.e., a random string
        const bcryptPassword = await bcrypt.hash(password, salt) // hash the password and the salt 
        const authUser = await pool.query( // insert the user and the hashed password into the database
            "INSERT INTO users(email, password) values ($1, $2) RETURNING*", [email, bcryptPassword]
        );
        console.log(authUser.rows[0].id);
        const token = await generateJWT(authUser.rows[0].id); // generates a JWT by taking the user id as an input (payload)
        //console.log(token);
        //res.cookie("isAuthorized", true, { maxAge: 1000 * 60, httpOnly: true });
        //res.cookie('jwt', token, { maxAge: 6000000, httpOnly: true });
        
        res.status(201).cookie('jwt', token, { httpOnly: true }).json({ user_id: newUser.rows[0].id });
      } catch (err) {
        console.error("Error adding user:", err.message);
        res.status(500).json({ message: 'Failed to add user' });
      }
});


app.post('/auth/login', async(req, res) => {
    try {
        console.log("a login request has arrived");
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "User is not registered" });

        console.log("Plain-text password received:", password);

        //Checking if the password is correct
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        console.log(user.rows[0].password);
        //console.log("validPassword:" + validPassword);
        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });

        const token = await generateJWT(user.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: user.rows[0].id })
            .send;
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

//logout a user = deletes the jwt
app.get('/auth/logout', (req, res) => {
    console.log('delete jwt request arrived');
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" }).send
});

app.get('/posts', async (req, res) => {
    try {
      console.log("GET request received for /posts"); 
      const posts = await pool.query('SELECT * FROM posts'); // Запрос данных
      console.log("Posts retrieved from database:", posts.rows); // Логи данных
      res.status(200).json(posts.rows); // Возвращаем данные как JSON
    } catch (error) {
      console.error('Error fetching posts:', error.message);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
});
  
 
  
  

app.get('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const post = await pool.query('SELECT * FROM posts WHERE postID = $1', [id]);

        if (post.rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json(post.rows[0]); 
    } catch (error) {
        console.error('Error fetching post:', error.message);
        res.status(500).json({ error: 'Failed to fetch post details' });
    }
});

app.delete('/posts', async (req, res) => {
    console.log('DELETE request received for /posts');
    try {
        await pool.query('DELETE FROM posts');
        res.status(200).json({ message: 'All posts deleted.' });
    } catch (error) {
        console.error('Error deleting all posts:', error.message);
        res.status(500).json({ error: 'Failed to delete posts.' });
    }
});



app.post('/posts', async (req, res) => {
    try {
      const { postID, postAuthorName, postAuthorPFP, postCreated, postText, postImage } = req.body;
  
      const newPost = await pool.query(
        "INSERT INTO posts (postID, postAuthorName, postAuthorPFP, postCreated, postText, postImage) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [postID, postAuthorName, postAuthorPFP, postCreated, postText, postImage]
      );
  
      res.status(201).json(newPost.rows[0]);
    } catch (error) {
      console.error("Error inserting posts:", error.message);
      res.status(500).json({ error: "Failed to insert posts." });
    }
  });
  
const fs = require("fs"); // Для чтения файла posts.json
const path = require('path');
const filePath = path.resolve(__dirname, '../public/data/posts.json');

const importPosts = async () => {
    try {
        const postsData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        for (let post of postsData) {
            const insertPostQuery = `
                INSERT INTO posts (postid, postauthorname, postauthorpfp, postcreated, posttext, postimage)
                VALUES ($1, $2, $3, $4, $5, $6)
                ON CONFLICT (postid) DO NOTHING;`;

            await pool.query(insertPostQuery, [
                post.postID,
                post.postAuthorName,
                post.postAuthorPFP,
                post.postCreated,
                post.postText,
                post.postImage
            ]);
        }

        console.log("Posts imported successfully!");
    } catch (error) {
        console.error("Error importing posts:", error.message);
    }
};

(async () => {
    console.log("Importing posts...");
    await importPosts();
  })();
