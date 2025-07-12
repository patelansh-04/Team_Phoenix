const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/authMiddleware');
const { getTasks, createTask } = require('../controllers/taskController');

router.get('/getTasks', authMiddleware, getTasks);
router.post('/createTask', authMiddleware, createTask);

module.exports = router;
