const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/authMiddleware');
const { getAllTasks, getTasks, createTask } = require('../controllers/taskController');

router.get('/', getAllTasks);
router.get('/getTasks', auhMiddleware, getTasks);
router.post('/createTask', authMiddleware, createTask);

module.exports = router;
