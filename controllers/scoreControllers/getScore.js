const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DATA_BASE } = process.env;
const mysql = require("mysql2/promise");

const getScore = async (req, res) => {
  const { id } = req.user;
  console.log(id);
  //   const sql =
  //     "SELECT `victory`, `defeat`, `draw`, `user_id`  FROM `score` WHERE `user_id` = '" +
  //     id +
  //       "' ";
  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DATA_BASE,
  });

  const { error, rows, fields } = await connection.execute(
    `SELECT * FROM score WHERE user_id = ${id} `
  );
  if (error) {
    res.status(400).json({ error });
  } else {
    res.status(200).json({ rows });
  }
  //   db.query(sql, (error, rows, fields) => {
  //     if (error) {
  //       res.status(400).json({ error });
  //     } else {
  //       res.status(200).json({ rows });
  //     }
  //   });
};
module.exports = getScore;
