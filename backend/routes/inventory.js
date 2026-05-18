const express = require("express");
const router = express.Router();

const pool = require("../db");

// GET INVENTORY
router.get("/", async (req, res) => {

  try {

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 50;

    const search =
      req.query.search || "";

    const offset =
      (page - 1) * limit;

    // TOTAL DATA
    const totalQuery = await pool.query(
      `
      SELECT COUNT(*)
      FROM inventory
      WHERE nama_barang ILIKE $1
      `,
      [`%${search}%`]
    );

    const totalData =
      Number(totalQuery.rows[0].count);

    const totalPages =
      Math.ceil(totalData / limit);

    // GET DATA
    const dataQuery = await pool.query(
      `
      SELECT *
      FROM inventory
      WHERE nama_barang ILIKE $1
      ORDER BY nama_barang ASC
      LIMIT $2
      OFFSET $3
      `,
      [
        `%${search}%`,
        limit,
        offset,
      ]
    );

    return res.json({
      success: true,
      data: dataQuery.rows,
      totalData,
      totalPages,
      currentPage: page,
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });

  }

});

// WAJIB ADA
module.exports = router;