const sql = require("mssql");
require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,

  options: {
    encrypt: false,
    trustServerCertificate: true,
  },

  connectionTimeout: 30000,
  requestTimeout: 30000,
};

async function testConnection() {
  try {
    console.log("Testing SQL connection...");
    console.log(config);

    await sql.connect(config);

    console.log("✅ SQL Server connected!");

    const result = await sql.query(`
      SELECT TOP 10 *
      FROM dbo.Inventories
    `);

    console.log("✅ SUCCESS DATA:");
    console.log(result.recordset);

  } catch (err) {
    console.error("❌ Connection failed:");
    console.error(err);
  }
}

testConnection();