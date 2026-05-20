const bcrypt = require("bcrypt");

async function run() {
  const password = "adminaccounting123x";

  const hash = await bcrypt.hash(password, 10);

  console.log(hash);
}

run();