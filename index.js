// packages needed for app
const inquirer = require('inquirer');
const mysql = require("mysql2");
const cTable = require('console.table');
require('dotenv').config();

const db = require('./db/connection');

const viewDepartment = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if(err){
            console.log(err)
            return;
        } 
        console.table(rows);
    });
};

const viewRoles= () => {
    const sql = `SELECT role.id, role.title, department.name AS department, role.salary FROM role 
                    LEFT JOIN department ON department_id = department.id`;
    db.query(sql, (err, rows) => {
        if(err){
            console.log(err)
            return;
        } 
        console.table(rows);
    });

};

const viewEmployees = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id FROM employee
                LEFT JOIN role ON role_id = role.id
                LEFT JOIN department ON department_id = department.id`
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
    //viewDepartment();
    viewRoles();
    viewEmployees();
})