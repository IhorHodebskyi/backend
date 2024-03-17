const mysql = require("mysql2/promise");
const config = require("../db/connection");

const getScore = async (id) => {
  const sql =
    "SELECT `user_id`, `victory`, `defeat`, `draw` FROM `score` WHERE `user_id` = '" +
    id +
    "' ";
  const conn = await mysql.createConnection(config);
  const [rows] = await conn.execute(sql);
  conn.end();
  return rows[0];
};

const update = async (id, victory, defeat, draw) => {
  const sql =
    "UPDATE `score` SET `victory` = '" +
    victory +
    "', `defeat` = '" +
    defeat +
    "',  `draw` = '" +
    draw +
    "'   WHERE `user_id`= '" +
    id +
    "'";
  const conn = await mysql.createConnection(config);
  const rows = await conn.execute(sql);
  conn.end();

  return rows[0];
};

module.exports = {
  getScore,
  update,
};
