const express = require("express");
const path = require("path");
const mysql = require("mysql");
const app = express();
const port = 3000;

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "zxcvbnm",
  database: "homebot",
});

app.use(express.static("public"));

app.get("/api/enviroment/get_all", (req, res) => {
    let sql = "SELECT * FROM enviroment";
    db.query(sql, (err, result) => {
      if (err) {
        console.log("get enviroment all data error.");
        console.log(err);
        res.status(400).send({});
      } else {
        res.status(200).send(result);
      }
    });
});

app.listen(port, () => {
    console.log("Express Listening port: "+port);
});
