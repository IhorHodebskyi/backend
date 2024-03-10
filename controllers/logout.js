const db = require("../db/connection");

const logout = (req, res) => {
  const { id } = req.user;
  console.log(req.user);
  const token = "";
  db.query(
    "UPDATE `users` SET `token` = '" + token + "' WHERE `id`= '" + id + "'",
    (error, results, fields) => {
      if (error) throw error;
      res.sendStatus(204);
    }
  );
};

module.exports = logout;
