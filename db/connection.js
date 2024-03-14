// const mysql = require("mysql2/promise");
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DATA_BASE } = process.env;

module.exports = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DATA_BASE,
};

// const connection = async () => {
//   try {
//     const conn = await mysql.createConnection(config);
//     console.log("Connect db");
//     return conn;
//   } catch (error) {
//     console.log(`We has any problems with connection to db. Error:${error}`);
//   }
// };
// module.exports = connection;
