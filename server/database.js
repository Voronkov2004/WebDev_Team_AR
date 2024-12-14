 // database.js
 const Pool = require('pg').Pool;
 const pool = new Pool({
     user: "postgres",
     password: "password",
     database: "argroup",
     host: "localhost",
     port: "5433"
 });
 const execute = async(query) => {
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
 

(async () => {
    const tableCreated = await execute(createTblQuery);
    if (tableCreated) {
        console.log('Table "users" is created or already exists');
        const userAdded = await execute(addTestUser);
        if (userAdded) {
            console.log('Test user is added');
        } else {
            console.log('Failed to add test user');
        }
    } else {
        console.log('Failed to create table "users"');
    }
})();

 
module.exports = pool;