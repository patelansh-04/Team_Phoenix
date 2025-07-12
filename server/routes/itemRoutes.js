const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/authMiddleware');
const { getAllItems, createItem } = require('../controllers/itemController');

router.get('/', getAllItems);
router.post('/', authMiddleware, createItem);

module.exports = router;
