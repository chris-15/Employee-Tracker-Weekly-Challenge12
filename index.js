// packages needed for app
const inquirer = require('inquirer');
const mysql = require("mysql2");
const cTable = require('console.table');
require('dotenv').config();

const db = require('./db/connection');

const viewDepartment= () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if(err){
            console.log(err)
            return;
        } 
        console.table(rows);
    });

};

// connects to mysql database
db.connect(err => {
    if(err) throw err;
    console.log('Database connected');
    viewDepartment();
})