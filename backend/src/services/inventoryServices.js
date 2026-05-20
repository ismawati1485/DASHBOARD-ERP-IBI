const sql = require('mssql');

const getConfig = () => ({
  user: process.env.DB_USER || 'sqladmin',
  password: process.env.DB_PASSWORD || 'sqladmin',

  // FIX: pakai DB_HOST, bukan DB_SERVER
  server: process.env.DB_HOST || 'WIN-EC334JPNLEV',

  // optional
  port: process.env.DB_PORT
    ? parseInt(process.env.DB_PORT, 10)
    : 1433,

  database: process.env.DB_NAME || 'TRGdb001',

  options: {
    encrypt: false,
    trustServerCertificate: true,
  },

  connectionTimeout: 30000,
  requestTimeout: 30000,
});

async function getInventoriesList(limit = 50) {
  const pool = new sql.ConnectionPool(getConfig());

  try {
    await pool.connect();

    console.log(`📡 Querying Inventories (limit: ${limit})...`);

    const result = await pool.request()
      .input('limit', sql.Int, limit)
      .query(`
        SELECT TOP (@limit) *
        FROM TRGdb001.dbo.Inventories
      `);

    console.log(`✅ Retrieved ${result.recordset.length} rows`);

    return result.recordset;

  } catch (error) {
    console.error('❌ Query error:', error);
    throw error;

  } finally {
    await pool.close();
  }
}

async function getInventoriesCount() {
  const pool = new sql.ConnectionPool(getConfig());

  try {
    await pool.connect();

    const result = await pool.request()
      .query(`
        SELECT COUNT(*) as total
        FROM TRGdb001.dbo.Inventories
      `);

    return result.recordset[0]?.total || 0;

  } catch (error) {
    console.error('❌ Count error:', error);
    throw error;

  } finally {
    await pool.close();
  }
}

async function getInventoryById(id) {
  const pool = new sql.ConnectionPool(getConfig());

  try {
    await pool.connect();

    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`
        SELECT *
        FROM TRGdb001.dbo.Inventories
        WHERE id = @id
      `);

    return result.recordset[0] || null;

  } catch (error) {
    console.error('❌ Get by ID error:', error);
    throw error;

  } finally {
    await pool.close();
  }
}

module.exports = {
  getInventoriesList,
  getInventoriesCount,
  getInventoryById
};