const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/authMiddleware');
const { getAllItems } = require('../controllers/itemController');

router.get('/', getAllItems);

module.exports = router;
