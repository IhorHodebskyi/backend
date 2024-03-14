const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../db/connection");
const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const signup = async (body) => {
  const { name, email, password } = body;
  let sql =
    "SELECT `id`, `email`, `name` FROM `users` WHERE `email` = '" + email + "'";
  //   let sql = `SELECT id, name, email FROM users WHERE email = '${email}'`;
  const conn = await mysql.createConnection(config);
  const rows = await conn.execute(sql);
  console.log(rows.length > 0);
  if (rows.length > 0) {
    conn.end();
    throw HttpError(409, "Email in use");
    // res.status(409).json({ message: "Email in use" });
  }
  console.log("object");
  const salt = bcrypt.genSaltSync(15);
  const hashPassword = bcrypt.hashSync(password, salt);
  const payload = {
    email: email,
  };
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "23h",
  });
  sql =
    "INSERT INTO `users` (`name`, `email`, `password`, `token`) VALUES ('" +
    name +
    "', '" +
    email +
    "','" +
    hashPassword +
    "', '" +
    token +
    "')";
  const results = await conn.execute(sql);
  console.log(results[0].insertId);
  return {
    token,
    user: {
      id: results[0].insertId,
      name,
      email,
    },
  };
};

module.exports = {
  signup,
};
