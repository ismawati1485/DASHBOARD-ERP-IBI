const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const router = express.Router();

// LOGIN (DEBUG VERSION)

router.post("/login", async (req, res) => {
  try {
    console.log("🔥 LOGIN HIT");

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

const userQuery = await pool.query(
  `
  SELECT 
    users.id,
    users.username,
    users.password_hash,
    user_types.name AS role
  FROM users
  LEFT JOIN user_types
    ON users.user_type_id = user_types.id
  WHERE users.username = $1
  `,
  [username]
);

    if (userQuery.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const user = userQuery.rows[0];

    // CEK PASSWORD HASH
    if (!user.password_hash) {
      console.log("password_hash NULL");
      return res.status(500).json({
        success: false,
        message: "password_hash is NULL in DB",
      });
    }

    let valid = false;

    try {
      valid = await bcrypt.compare(password, user.password_hash);
    } catch (err) {
      console.log(" BCRYPT ERROR:", err.message);
      return res.status(500).json({
        success: false,
        message: "bcrypt error",
      });
    }


    if (!valid) {
      return res.status(401).json({
        success: false,
        message: "Wrong password",
      });
    }

    // TOKEN EXPIRE 15 MENIT
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // JWT
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role || username,
      },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "15m" }
    );

    // SAVE SESSION
    await pool.query(
      `INSERT INTO sessions (user_id, token, expires_at)
       VALUES ($1, $2, $3)`,
      [user.id, token, expiresAt]
    );

    // UPDATE LAST LOGIN
    await pool.query(
      `UPDATE users 
      SET last_login = NOW(),
          modified_at = NOW()
      WHERE id = $1`,
      [user.id]
    );
      
    console.log(" LOGIN SUCCESS");

    return res.json({
      success: true,
      token,
      token_expires_at: expiresAt,
      data: {
        id: user.id,
        username: user.username,
        role: user.role || user.username,
      },
    });

  } catch (err) {
    console.error(" LOGIN ERROR TOTAL:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//LOGOUT

router.post("/logout", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    await pool.query("DELETE FROM sessions WHERE token = $1", [token]);

    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Logout error",
    });
  }
});


 //ME

router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token",
      });
    }

    const session = await pool.query(
      "SELECT * FROM sessions WHERE token = $1",
      [token]
    );

    if (session.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Session not found",
      });
    }

    const s = session.rows[0];

    if (new Date() > new Date(s.expires_at)) {
      await pool.query("DELETE FROM sessions WHERE token = $1", [token]);

      return res.status(401).json({
        success: false,
        message: "Session expired",
      });
    }

    return res.json({
      success: true,
      valid: true,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;