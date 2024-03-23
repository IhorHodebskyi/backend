const mysql = require("mysql2/promise");
const config = require("../db/connection");

const getContacts = async (user_id) => {
  console.log(user_id);
  const sql =
    "SELECT `id`, `user_id`, `name`, `number` FROM `contacts` WHERE `user_id` = '" +
    user_id +
    "' ";
  const conn = await mysql.createConnection(config);
  const rows = await conn.execute(sql);
  conn.end();
  console.log(rows);
  return rows[0];
};

const addContacts = async (user_id, name, number) => {
  const id = Date.now().toString().split("").slice(3, 13).join("");
  const sql =
    "INSERT INTO `contacts` (`id`, `name`, `number`, `user_id`) VALUES ('" +
    id +
    "', '" +
    name +
    "','" +
    number +
    "', '" +
    user_id +
    "')";

  const conn = await mysql.createConnection(config);
  const [rows] = await conn.execute(sql);
  conn.end();
  const result = {
    id,
    name,
    number,
    user_id,
  };
  return result;
};

const deleteContact = async (id) => {
  const sql = "";
  const conn = await mysql.createConnection(config);
  const rows = await conn.execute(sql);
  return;
};

module.exports = {
  getContacts,
  addContacts,
};
