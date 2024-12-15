// database.js
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "voronkov",
  password: "",
  database: "argroup",
  host: "localhost",
  port: "5432",
});
const execute = async (query) => {
  try {
    await pool.connect(); // create a connection
    await pool.query(query); // executes a query
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  }
};

/* 
gen_random_uuid() A system function to generate a random Universally Unique IDentifier (UUID)
An example of generated uuid:  32165102-4866-4d2d-b90c-7a2fddbb6bc8
*/

const createTblQuery = `
    CREATE TABLE IF NOT EXISTS "users" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL 
    );`;

const addTestUser = `
    INSERT INTO users (email, password) VALUES 
    ('test@example.com', '$2b$10$h/29CzysistyaKXfU8cHmu4FU94ZF1FvvARrWRXK1rt4a6RSc6u8q');`;

const createPostsTblQuery = `
CREATE TABLE IF NOT EXISTS posts (
    postid SERIAL PRIMARY KEY,
    postauthorname VARCHAR(200) NOT NULL,
    postauthorpfp VARCHAR(300),
    postcreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    posttext TEXT NOT NULL,
    postimage VARCHAR(300)
);`;

(async () => {
  const tableCreated = await execute(createTblQuery);
  if (tableCreated) {
    console.log('Table "users" is created or already exists');
  } else {
    console.log('Failed to create table "users"');
  }
})();

module.exports = pool;

const fs = require("fs");

const importPosts = async () => {
  try {
    const path = require("path");
    const postsFilePath = path.join(__dirname, "../public/data/posts.json");

    const postsData = JSON.parse(fs.readFileSync(postsFilePath, "utf-8"));

    const insertPostQuery = `
        INSERT INTO posts (postauthorname, postauthorpfp, postcreated, posttext, postimage)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;`;

    for (const post of postsData) {
      const pfp =
        post.postAuthorPFP && post.postAuthorPFP.trim() !== ""
          ? post.postAuthorPFP
          : null;
      const image =
        post.postImage && post.postImage.trim() !== "" ? post.postImage : null;

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
};

(async () => {
  const tableCreated = await execute(createPostsTblQuery);
  if (tableCreated) {
    console.log('Table "posts" is created or already exists');

    // Optional: only import if no posts exist
    const { rows } = await pool.query("SELECT COUNT(*) FROM posts");
    if (parseInt(rows[0].count, 10) === 0) {
      await importPosts();
    } else {
      console.log("Posts already imported, skipping...");
    }
  } else {
    console.log('Failed to create table "posts"');
  }
})();
