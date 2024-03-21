const mysql = require("mysql2/promise");
const config = require("../db/connection");
const { nanoid } = require("nanoid");

const getContacts = async (id) => {
  const sql =
    "SELECT `id`, `user_id`, `name`, `phone` FROM `contacts` WHERE `user_id` = '" +
    id +
    "' ";
  const conn = await mysql.createConnection(config);
  const [rows] = await conn.execute(sql);
  conn.end();
  return rows[0];
};

const addContacts = async (user_id, name, phone) => {
  const id = nanoid();
  const sql =
    "INSERT INTO `contacts` (`id`, `name`, `phone`, `user_id`) VALUES ('" +
    id +
    "', '" +
    name +
    "','" +
    phone +
    "', '" +
    user_id +
    "')";

  const conn = await mysql.createConnection(config);
  const rows = await conn.execute(sql);
  console.log(rows);
  conn.end();

  return rows[0];
};

module.exports = {
  getContacts,
  addContacts,
};
