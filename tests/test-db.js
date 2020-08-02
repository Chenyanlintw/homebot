const mysql = require('mysql');

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'zxcvbnm',
	database: 'homebot'
});


db.connect((err) => {
    if(err) {
        console.log(err);
    }
});

let sql = "INSERT INTO enviroment SET ?";
let data = {module_id: 1, temperature: 29.5, humidity: 66, lux: 0.1};
let query = db.query(sql, data, (err, result) => {
    if (err) {
        console.log(err);
    } else {
	console.log(result);
	console.log("Test data added!");
    }
});


