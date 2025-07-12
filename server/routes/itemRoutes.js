const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/authMiddleware');
const { getAllItems, createItem, getItemById } = require('../controllers/itemController');

// Public routes
router.get('/', getAllItems);
router.get('/:id', getItemById);

// Protected routes
router.post('/', authMiddleware, createItem);

module.exports = router;
