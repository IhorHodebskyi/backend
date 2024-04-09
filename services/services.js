const db = require("../db/connection");

const getScore = async () => {
  const sql = "SELECT users.id, users.name, count.high_score FROM users INNER JOIN count ON users.id = count.user_id ";
  const { rows } = await db.query(sql);
  return rows;
};

const update = async (id, score) => {
  const sql = "UPDATE count SET high_score = $1  WHERE user_id= $2 RETURNING *";
  const { rows } = await db.query(sql, [score, id]);
  return { id, high_score: score };
};

module.exports = {
  getScore,
  update,
};
