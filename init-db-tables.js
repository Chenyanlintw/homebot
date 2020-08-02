const mysql = require("mysql");

// Create Connection
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "zxcvbnm",
	database: "homebot"
});

// Connect
db.connect((err) => {
    if(err) {
        console.log(err);
    } else {
        console.log("Mysql Connected...");
    }
});

// Create enviroment table
db.query("DROP TABLE IF EXISTS enviroment;");
let create_enviroment_table_sql = "CREATE TABLE enviroment(id int AUTO_INCREMENT NOT NULL, time DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, module_id int NOT NULL,temperature DOUBLE DEFAULT 0 NOT NULL, humidity DOUBLE DEFAULT 0 NOT NULL, lux DOUBLE DEFAULT 0 NOT NULL, PRIMARY KEY(id))";
db.query(create_enviroment_table_sql, (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Table [enviroment] created!");
    }
});
