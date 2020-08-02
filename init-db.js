const mysql = require("mysql");

// Create Connection
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "zxcvbnm"
});

// Connect
db.connect((err) => {
    if(err) {
        console.log(err);
    } else {
        console.log("Mysql Connected...");
    }
});

// Create DB
let sql = "CREATE DATABASE `homebot` CHARACTER SET utf8";
db.query(sql, (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Databse: homebot created.");
    }
});
