const mysql = require("mysql");
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DATA_BASE } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DATA_BASE,
});

connection.connect((error) => {
  if (error) {
    return console.log(`Error connect db ${error}`);
  } else {
    return console.log("Connect db");
  }
});

module.exports = connection;
