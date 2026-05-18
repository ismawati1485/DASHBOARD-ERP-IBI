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

function emptyToNull(value) {
  if (value === "") {
    return null;
  }

  return value;
}

// ======================================
// SYNC INVENTORY TRANSACTIONS
// ======================================
async function syncInventoryTransactions() {

  try {

    for (let page = 1; page <= 98; page++) {

      console.log(`
========================
AMBIL PAGE ${page}
========================
`);

      const response = await axios.get(
        `http://www.mascrm.cloud:6436/api/public/inventorytransaction?pageSize=20&pageNumber=${page}`,
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
          INSERT INTO inventory_transactions (

            inventory_transaction_id,
            parent_transaction,

            type_trn,
            ket_type,

            tgl_trn,

            kode_dept,

            kode_gudang,
            gdg_target,

            keterangan,

            is_view_starting_balance,

            attach_file_id,

            file_path,
            file_name,

            rack,

            status,

            level_status,

            approval_status,

            is_use_at_transfer_in,

            integration_id,

            no_bukti_integrasi,

            all_no_stock_request,

            stock_request_id,

            kode_gudang_transit,

            created_at

          )
          VALUES (

            $1,$2,$3,$4,$5,
            $6,$7,$8,$9,$10,
            $11,$12,$13,$14,$15,
            $16,$17,$18,$19,$20,
            $21,$22,$23,NOW()

          )

          ON CONFLICT (inventory_transaction_id)

          DO UPDATE SET

            parent_transaction = EXCLUDED.parent_transaction,
            type_trn = EXCLUDED.type_trn,
            ket_type = EXCLUDED.ket_type,
            tgl_trn = EXCLUDED.tgl_trn,
            kode_dept = EXCLUDED.kode_dept,
            kode_gudang = EXCLUDED.kode_gudang,
            gdg_target = EXCLUDED.gdg_target,
            keterangan = EXCLUDED.keterangan,
            approval_status = EXCLUDED.approval_status
          `,
          [
  emptyToNull(item.inventoryTransactionId),
  item.parentTransaction || null,

  item.typeTrn || null,
  item.ketType || null,

  item.tglTrn || null,

  item.kodeDept || null,

  item.kodeGudang || null,
  item.gdgTarget || null,

  item.keterangan || null,

  item.isViewStartingBalance ?? false,

  emptyToNull(item.attachFileId),

  item.filePath || null,
  item.fileName || null,

  item.rack || null,

  item.status || null,

  item.levelStatus || 0,

  item.approvalStatus || null,

  item.isUseAtTransferIn ?? false,

  emptyToNull(item.integrationId),

  item.noBuktiIntegrasi || null,

  item.allNoStockRequest || null,

  emptyToNull(item.stockRequestId),

  item.kodeGudangTransit || null,
]
        );

      }

      console.log(`
PAGE ${page} BERHASIL
`);

    }

    console.log(`
========================
SYNC INVENTORY TRANSACTIONS SELESAI
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

syncInventoryTransactions();