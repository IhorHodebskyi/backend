const jwt = require("jsonwebtoken");
const db = require("../db/connection");
const { SECRET_KEY } = process.env;

const authenticate = (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    res.status(401).json({ message: "Not Authorized" });
    return;
  }
  try {
    const { email } = jwt.verify(token, SECRET_KEY);
    db.query(
      "SELECT `id`,`name`, `email`,`token` FROM `users` WHERE `email` = '" +
        email +
        "'",
      (error, rows, fields) => {
        const user = rows[0];
        if (!user || user.token !== token) {
          res.status(401).json({ message: "Not Authorized" });
          return;
        }
        req.user = user;
        next();
      }
    );
  } catch (error) {
    res.status(401).json({ message: "Not Authorized" });
  }
};

module.exports = authenticate;
