const status = require("../response");
const db = require("../db/connection");

users = (req, res) => {
  db.query("SELECT * FROM `users`", (error, rows, fields) => {
    if (error) {
      console.log(error);
    } else {
      status(rows, res);
    }
  });
};

module.exports = {
  users,
};
