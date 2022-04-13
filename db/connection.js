const mysql = require('mysql2');
require('dotenv').config();

// connect to database
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: process.env.DB_PW,
        database: "employee-tracker",
    },
);

module.exports = db;