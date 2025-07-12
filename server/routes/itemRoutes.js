const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/authMiddleware');
<<<<<<< HEAD
const { getAllItems, createItem, getItemById } = require('../controllers/itemController');
=======
const { getAllItems, createItem } = require('../controllers/itemController');
>>>>>>> 474384150c3d59b32d9e4b6c3b7a526e7f302ced

// Public routes
router.get('/', getAllItems);
<<<<<<< HEAD
router.get('/:id', getItemById);

// Protected routes
=======
>>>>>>> 474384150c3d59b32d9e4b6c3b7a526e7f302ced
router.post('/', authMiddleware, createItem);

module.exports = router;
