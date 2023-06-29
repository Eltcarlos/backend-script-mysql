const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "udemy_delivery",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("DATABASE CONNECTED!");
});

module.exports = db;
