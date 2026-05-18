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

// ======================================
// SYNC INVENTORY ONLY
// ======================================
async function syncInventory() {
  try {

    for (let page = 1; page <= 66; page++) {

      console.log(`
========================
AMBIL PAGE ${page}
========================
`);

      const response = await axios.get(
        `http://www.mascrm.cloud:6436/api/public/inventory?pageSize=100&pageNumber=${page}`,
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
          INSERT INTO inventory (
            inventory_id,
            kode_item,
            nama_barang,
            kode_kategori,
            nama_kategori,
            satuan,
            part_number,
            kode_merk,
            nama_merk,
            harga_jual,
            created_at
          )
          VALUES (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,NOW()
          )

          ON CONFLICT (inventory_id)
          DO UPDATE SET
            kode_item = EXCLUDED.kode_item,
            nama_barang = EXCLUDED.nama_barang,
            kode_kategori = EXCLUDED.kode_kategori,
            nama_kategori = EXCLUDED.nama_kategori,
            satuan = EXCLUDED.satuan,
            part_number = EXCLUDED.part_number,
            kode_merk = EXCLUDED.kode_merk,
            nama_merk = EXCLUDED.nama_merk,
            harga_jual = EXCLUDED.harga_jual
          `,
          [
            item.inventoryId,
            item.kodeItem,
            item.namaBarang,
            item.kodeKategory,
            item.namaKategory,
            item.kodeSatuan,
            item.partNumber,
            item.kodeMerk,
            item.namaMerk,
            item.hargaJual,
          ]
        );

      }

      console.log(`
PAGE ${page} BERHASIL
`);
    }

    console.log(`
========================
SYNC INVENTORY SELESAI
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

syncInventory();