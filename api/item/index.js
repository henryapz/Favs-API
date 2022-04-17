const { Router } = require('express');
const { createItem } = require('./item.controller');

const router = Router();

// Create Item
router.post('/createItem', createItem);

module.exports = router;
