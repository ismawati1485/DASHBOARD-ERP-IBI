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

async function syncCustomer() {
  try {

    // LANJUT DARI PAGE TERAKHIR
    for (let page = 13; page <= 37; page++) {

      console.log(`AMBIL PAGE ${page}`);

      const response = await axios.get(
        `http://www.mascrm.cloud:6436/api/public/customer?pageSize=200&pageNumber=${page}`,
        {
          headers: {
            Authorization: process.env.MASERP_TOKEN,
          },
        }
      );

      const data = response.data.list;

      console.log(`TOTAL DATA PAGE ${page}: ${data.length}`);

      for (const item of data) {

        try {

          await pool.query(
            `
            INSERT INTO customer (
              customer_id,
              kode_lgn,
              nama_lgn,
              customer_type_name,
              kode_sales
            )
            VALUES ($1, $2, $3, $4, $5)

            ON CONFLICT (customer_id)
            DO NOTHING
            `,
            [
              item.customerId,
              item.kodeLgn,
              item.namaLgn,
              item.customerTypeName,
              item.kodeSales,
            ]
          );

        } catch (err) {
          console.log("ERROR INSERT:", err.message);
        }
      }

      console.log(`PAGE ${page} BERHASIL`);

      // DELAY BIAR API GAK STRESS
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log("SYNC CUSTOMER SELESAI");

  } catch (error) {
    console.log("ERROR:", error.message);
  }
}

syncCustomer();