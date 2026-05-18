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

async function syncSalesInvoice() {
  try {

    for (let page = 1; page <= 14; page++) {

      console.log(`AMBIL PAGE ${page}`);

      const response = await axios.get(
        `http://www.mascrm.cloud:6436/api/public/salesinvoice?pageSize=100&pageNumber=${page}`,
        {
          headers: {
            Authorization: process.env.MASERP_TOKEN,
          }
        }
      );

      const data = response.data.list;

      for (const item of data) {

        await pool.query(
          `
          INSERT INTO sales_invoice (
            invoice_id,
            no_bukti,
            tgl_faktur,
            customer_name,
            grand_total,
            kode_cc
          )
          VALUES ($1, $2, $3, $4, $5, $6)
          `,
          [
            item.salesInvoiceHeaderId,
            item.noBukti,
            item.tglFaktur,
            item.customerName,
            item.grandTotal,
            item.kodeCc
          ]
        );

      }

      console.log(`PAGE ${page} BERHASIL`);
    }

    console.log("SYNC SALES INVOICE SELESAI");

  } catch (error) {
    console.log(error);
  }
}

syncSalesInvoice();