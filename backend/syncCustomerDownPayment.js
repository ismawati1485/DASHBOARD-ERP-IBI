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
// SYNC CUSTOMER DOWN PAYMENT
// =============================
async function syncCustomerDownPayment() {

  try {

    for (let page = 1; page <= 12; page++) {

      console.log(`
========================
AMBIL PAGE ${page}
========================
`);

      const response = await axios.get(
        `http://www.mascrm.cloud:6436/api/public/customerdownpayment?pageSize=10&pageNumber=${page}`,
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
          INSERT INTO customer_down_payments (

            customer_down_payment_id,
            no_bukti,
            tgl_trn,
            customer_name,
            jumlah_trn,
            keterangan,
            customer_kode_crc,
            from_collect_payment,
            is_used,
            created_at

          )
          VALUES (

            $1,$2,$3,$4,$5,
            $6,$7,$8,$9,NOW()

          )

          ON CONFLICT (customer_down_payment_id)

          DO UPDATE SET

            no_bukti = EXCLUDED.no_bukti,
            tgl_trn = EXCLUDED.tgl_trn,
            customer_name = EXCLUDED.customer_name,
            jumlah_trn = EXCLUDED.jumlah_trn,
            keterangan = EXCLUDED.keterangan,
            customer_kode_crc = EXCLUDED.customer_kode_crc,
            from_collect_payment = EXCLUDED.from_collect_payment,
            is_used = EXCLUDED.is_used
          `,
          [

            emptyToNull(item.customerDownPayment2Id),

            item.noBukti || null,

            item.tglTrn || null,

            item.customerName || null,

            item.jumlahTrn || 0,

            item.keterangan || null,

            item.customerKodeCrc || null,

            item.fromCollectPayment ?? false,

            item.isUsed ?? false,
          ]
        );

      }

      console.log(`
PAGE ${page} BERHASIL
`);

    }

    console.log(`
========================
SYNC CUSTOMER DOWN PAYMENT SELESAI
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

syncCustomerDownPayment();