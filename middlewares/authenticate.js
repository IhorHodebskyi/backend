const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
const config = require("../db/connection");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    res.status(401).json({ message: "Not Authorized" });
    return;
  }
  try {
    const { email } = jwt.verify(token, SECRET_KEY);
    const sql =
      "SELECT `id`,`name`, `email`,`token` FROM `users` WHERE `email` = '" +
      email +
      "'";
    const conn = await mysql.createConnection(config);
    const rows = await conn.execute(sql);
    const [user] = rows[0];
    console.log(user);
    if (!user || user.token !== token) {
      res.status(401).json({ message: "Not Authorized" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not Authorized" });
  }
};

module.exports = authenticate;
