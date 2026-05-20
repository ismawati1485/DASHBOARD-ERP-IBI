// test_simple.js
const sql = require('mssql');

const config = {
  server: '36.88.7.113',
  port: 1433,
  database: 'TRGdb001',
  user: 'sqladmin',
  password: 'sqladmin',
  options: {
    encrypt: false,
    trustServerCertificate: true,
    connectTimeout: 30000,
  }
};

async function test() {
  try {
    const pool = new sql.ConnectionPool(config);
    await pool.connect();
    
    console.log('✅ Connected!');
    
    const result = await pool.request()
      .query('SELECT TOP 1 * FROM dbo.Inventories');
    
    console.log('✅ Data retrieved:');
    console.log(result.recordset[0]);
    
    await pool.close();
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

test();