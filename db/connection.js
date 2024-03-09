const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "rest",
});

connection.connect((error) => {
  if (error) {
    return console.log(`Error connect db ${error}`);
  } else {
    return console.log("Connect db");
  }
});

module.exports = connection;
