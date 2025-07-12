const Task = require('../models/Task.model');

const getTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.role === 'admin') {
      tasks = await Task.find(); // Admins can see all tasks
    } else {
      tasks = await Task.find({ userId: req.user.id }); // Users see only their own tasks
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, userId: req.user.id });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

module.exports = {
  getTasks,
  createTask
};
