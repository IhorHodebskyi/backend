const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DATA_BASE } = process.env;

module.exports = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DATA_BASE,
};
