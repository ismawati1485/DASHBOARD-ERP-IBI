const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "dashboard_erp_ibi",
  password: "ismawati123",
  port: 5433,
});

module.exports = pool;