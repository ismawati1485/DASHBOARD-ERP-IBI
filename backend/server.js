require('dotenv').config();
const express = require('express');

const inventoryRoutes = require('./src/routes/inventoryRoutes');

const app = express();

app.use(express.json());

app.use('/api', inventoryRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});