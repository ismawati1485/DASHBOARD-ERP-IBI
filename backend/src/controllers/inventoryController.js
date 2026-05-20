const {
  getInventoriesList,
  getInventoriesCount,
  getInventoryById
} = require('./../services/inventoryServices');

async function listInventories(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 50;

    console.log(`📥 Request: list inventories (limit=${limit})`);

    const data = await getInventoriesList(limit);
    const total = await getInventoriesCount();

    res.json({
      success: true,
      data,
      total,
      count: data.length,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Controller error:', error);

    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
}

async function getInventory(req, res) {
  try {
    const idParam = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const id = parseInt(idParam, 10);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid ID',
      });
    }

    const data = await getInventoryById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        error: 'Not found',
      });
    }

    res.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

module.exports = {
  listInventories,
  getInventory
};