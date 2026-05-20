const express = require('express');
const router = express.Router();

const {
  listInventories,
  getInventory
} = require('../controllers/inventoryController');

router.get('/inventories', listInventories);
router.get('/inventories/:id', getInventory);

module.exports = router;