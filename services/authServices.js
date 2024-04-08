const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../db/connection");
const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const signUp = async (body) => {
  const { name, email, password } = body;
  let sql = "SELECT `id`, `email`, `name` FROM `users` WHERE `email` = '" + email + "'";
  const conn = await mysql.createConnection(config);
  const [rows] = await conn.execute(sql);
  if (rows.length > 0) {
    conn.end();
    throw HttpError(409, "Email in use");
  }
  const salt = bcrypt.genSaltSync(15);
  const hashPassword = bcrypt.hashSync(password, salt);
  const payload = {
    email: email,
  };
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "23h",
  });
  sql =
    "INSERT INTO `users` (`name`, `email`, `password`, `token`, `highScore`) VALUES ('" +
    name +
    "', '" +
    email +
    "','" +
    hashPassword +
    "', '" +
    token +
    "', '0')";
  const [results] = await conn.execute(sql);
  conn.end();
  return {
    token,
    user: {
      id: results.insertId,
      name,
      email,
      highScore: 0,
    },
  };
};

const singIn = async (email, password) => {
  let sql = "SELECT `id`,`name`, `email`, `password`, `highScore` FROM `users` WHERE `email` = '" + email + "'";
  const conn = await mysql.createConnection(config);
  const [rows] = await conn.execute(sql);

  if (rows.length <= 0) {
    conn.end();
    throw HttpError(401, "Email or password is wrong");
  }

  const [user] = rows;
  const result = bcrypt.compareSync(password, user.password);

  if (!result) {
    conn.end();
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    email: user.email,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  sql = "UPDATE `users` SET `token` = '" + token + "' WHERE `email`= '" + email + "'";
  await conn.execute(sql);
  conn.end();
  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, highScore: user.highScore },
  };
};

const logout = async (id) => {
  const token = "";
  const sql = "UPDATE `users` SET `token` = '" + token + "' WHERE `id`= '" + id + "'";
  const conn = await mysql.createConnection(config);
  await conn.execute(sql);
  conn.end();
};

module.exports = {
  signUp,
  singIn,
  logout,
};
