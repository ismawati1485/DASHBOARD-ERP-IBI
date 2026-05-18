const bcrypt = require("bcrypt");
const pool = require("./db");

async function run() {
  const users = [
    { username: "admin_tax", password: "admintax123", role: "admin_tax" },
    { username: "admin_finance", password: "adminfinance123", role: "admin_finance" }
  ];

  for (const u of users) {
    const hash = await bcrypt.hash(u.password, 10);

    await pool.query(
      `UPDATE users 
       SET password_hash = $1 
       WHERE username = $2`,
      [hash, u.username]
    );

    console.log(`OK update ${u.username}`);
  }

  console.log("DONE ALL USERS");
}

run();