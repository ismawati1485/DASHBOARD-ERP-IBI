const sql = require('mssql');

const config = {
  user: process.env.DB_USER || 'sqladmin',
  password: process.env.DB_PASSWORD || 'sqladmin',

  // FIX: jangan fallback ke 36.88 lagi
  server: process.env.DB_HOST || 'WIN-EC334JPNLEV',

  database: process.env.DB_NAME || 'TRGdb001',

  // optional
  port: process.env.DB_PORT
    ? parseInt(process.env.DB_PORT, 10)
    : 1433,

  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
  },

  connectionTimeout: 30000,
  requestTimeout: 30000,
};

module.exports = {
  sql,
  config,
};