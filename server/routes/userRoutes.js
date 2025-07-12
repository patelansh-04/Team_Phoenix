const express = require('express');
const router = express.Router();

const authMiddleware   = require('../middleware/authMiddleware');
const restrictToUser   = require('../middleware/restrictToUser');
const { updateProfile } = require('../controllers/userController');

router.put('/profile', authMiddleware, restrictToUser, updateProfile);

module.exports = router;
