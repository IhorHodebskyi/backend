const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db/connection");
const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const signUp = async (body) => {
  const { name, email, password } = body;
  let sql = "SELECT * FROM users WHERE email=$1";
  const { rows } = await db.query(sql, [email]);

  if (rows.length > 0) {
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

  sql = "INSERT INTO users (name, email, password, token) values($1, $2, $3, $4) RETURNING *";
  const newUser = await db.query(sql, [name, email, hashPassword, token]);

  sql = "INSERT INTO count (high_score, user_id) values($1, $2) RETURNING *";
  const highScore = await db.query(sql, [0, newUser.rows[0].id]);

  return {
    token,
    user: {
      id: newUser.rows[0].id,
      name,
      email,
      highScore: highScore.rows[0].high_score,
    },
  };
};

const singIn = async (email, password) => {
  let sql = "SELECT * FROM users INNER JOIN count ON users.email = $1";

  const { rows } = await db.query(sql, [email]);

  if (rows.length <= 0) {
    throw HttpError(401, "Email or password is wrong");
  }

  const [user] = rows;
  const result = bcrypt.compareSync(password, user.password);

  if (!result) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    email: user.email,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  sql = "UPDATE users SET token = $1 WHERE email= $2 RETURNING *";
  const updateUser = await db.query(sql, [token, email]);

  return {
    token,
    user: { id: updateUser.rows[0].id, name: user.name, email: user.email, high_score: user.high_score },
  };
};

const logout = async (id) => {
  const token = "";
  const sql = "UPDATE users SET token = $1 WHERE id = $2";
  const updateUser = await db.query(sql, [token, id]);
};

module.exports = {
  signUp,
  singIn,
  logout,
};
