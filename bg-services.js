const mysql = require("mysql");
const dht_sensor = require("node-dht-sensor");

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "zxcvbnm",
	database: "homebot"
});


function recordEnviromentVals() {
    dht_sensor.read(22, 4, (err, temp, humi) => {
        if (!err) {
            console.log(`Sensor: temp: ${temp}°C, humidity: ${humi}%`);
            let data = {module_id: 1, temperature: temp, humidity: humi, lux: 0};
            let sql = "INSERT INTO enviroment SET ?";
	    db.query(sql, data, (err, result) => {
		if(err) throw err;
		console.log("Data Added!");
	    });
	}
    });
}

let delay_mins = 5; 
var timerId = setInterval(recordEnviromentVals, 1000 * 60 * delay_mins);



