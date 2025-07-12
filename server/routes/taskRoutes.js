const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/authMiddleware');
const { getTasks, createTask } = require('../controllers/taskController');

router.get('/', authMiddleware, getTasks);
router.post('/create', authMiddleware, createTask);


module.exports = router;
