require("dotenv").config();

const axios = require("axios");
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// =============================
// HELPER
// =============================
function emptyToNull(value) {
  if (value === "") {
    return null;
  }

  return value;
}

// =============================
// SYNC WAREHOUSE
// =============================
async function syncWarehouse() {

  try {

    for (let page = 1; page <= 6; page++) {

      console.log(`
========================
AMBIL PAGE ${page}
========================
`);

      const response = await axios.get(
        `http://www.mascrm.cloud:6436/api/public/warehouse?pageSize=10&pageNumber=${page}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.MASERP_TOKEN}`,
          },
        }
      );

      const data = response.data.list || [];

      console.log(`TOTAL DATA PAGE ${page}: ${data.length}`);

      for (const item of data) {

        await pool.query(
          `
          INSERT INTO warehouses (

            kode_gudang,
            nama_gudang,
            ket_gudang,
            kode_dept,
            created_at

          )
          VALUES (

            $1,$2,$3,$4,NOW()

          )

          ON CONFLICT (kode_gudang)

          DO UPDATE SET

            nama_gudang = EXCLUDED.nama_gudang,
            ket_gudang = EXCLUDED.ket_gudang,
            kode_dept = EXCLUDED.kode_dept
          `,
          [

            emptyToNull(item.kodeGudang),

            item.namaGudang || null,

            item.ketGudang || null,

            item.kodeDept || null,
          ]
        );

      }

      console.log(`
PAGE ${page} BERHASIL
`);

    }

    console.log(`
========================
SYNC WAREHOUSE SELESAI
========================
`);

  } catch (error) {

    console.log(`
========================
ERROR SYNC
========================
`);

    console.log(error.response?.data || error.message);

  } finally {

    await pool.end();

  }

}

syncWarehouse();