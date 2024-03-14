const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../../db/connection");
const ctrlWrapper = require("../../helpers/ctrlWrapper");

const { SECRET_KEY } = process.env;

const signUp = (req, res) => {
  const { name, email } = req.body;
  const sql =
    "SELECT `id`, `email`, `name` FROM `users` WHERE `email` = '" + email + "'";
  db.query(sql, (error, rows, fields) => {
    if (error) {
      res.status(400).json({ error });
    }
    if (typeof rows !== "undefined" && rows.length > 0) {
      res.status(409).json({ message: "Email in use" });
    } else {
      const salt = bcrypt.genSaltSync(15);
      const password = bcrypt.hashSync(req.body.password, salt);
      const payload = {
        email: email,
      };
      const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: "23h",
      });
      const sql =
        "INSERT INTO `users` (`name`, `email`, `password`, `token`) VALUES ('" +
        name +
        "', '" +
        email +
        "','" +
        password +
        "', '" +
        token +
        "')";
      db.query(sql, (error, results) => {
        console.log(results);
        if (error) {
          res.status(400).json({ error });
        } else {
          res.status(200).json({
            token,
            user: {
              id: results.insertId,
              name,
              email,
            },
          });
        }
      });
    }
  });
};

module.exports = {
  getAllUser,
  signUp: ctrlWrapper(signUp),
};
