const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../../db/connection");

const { SECRET_KEY } = process.env;

const singIn = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT `id`,`name`, `email`, `password` FROM `users` WHERE `email` = '" +
      email +
      "'",
    (error, rows, fields) => {
      if (error) {
        res.status(401).json({ message: "Email or password is wrong" });
      } else if (rows.length <= 0) {
        res.status(401).json({ message: "Email or password is wrong" });
      } else {
        const user = rows[0];
        const result = bcrypt.compareSync(password, user.password);

        if (!result) {
          res.status(401).json({ message: "Email or password is wrong" });
          return;
        }
        const payload = {
          email: user.email,
        };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
        db.query(
          "UPDATE `users` SET `token` = '" +
            token +
            "' WHERE `email`= '" +
            email +
            "'",
          (error, results, fields) => {
            if (error) throw res.status(401).json({ message: error });
            return;
          }
        );
        res.status(201).json({
          token,
          user: { id: user.id, name: user.name, email: user.email },
        });
      }
    }
  );
};

module.exports = singIn;
