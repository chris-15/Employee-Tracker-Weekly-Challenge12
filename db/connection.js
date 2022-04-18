const mysql = require('mysql2');
require('dotenv').config();

// connect to database
// using dot env to hide database password with .env file that is not pushed to github
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: process.env.DB_PW,
        database: "employee_db",
    },
);

module.exports = db;