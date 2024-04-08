const mysql = require("mysql2/promise");
const config = require("../db/connection");

const getScore = async () => {
  const sql = "SELECT `id`, `name`, `highScore` FROM `users` ";
  const conn = await mysql.createConnection(config);
  const [rows] = await conn.execute(sql);
  conn.end();
  return rows;
};

const update = async (id, score) => {
  console.log(score);
  const sql = "UPDATE `users` SET `highScore` = '" + score + "'  WHERE `id`= '" + id + "'";
  const conn = await mysql.createConnection(config);
  const rows = await conn.execute(sql);
  conn.end();
  return { id, highScore: score };
};

module.exports = {
  getScore,
  update,
};
