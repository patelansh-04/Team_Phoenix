const Task = require('../models/Task.model');

const getAllTasks = async (req, res) => {
  const featuredItems = [
    {
      id: '1',
      title: 'Vintage Denim Jacket',
      category: 'Outerwear',
      size: 'M',
      condition: 'Good',
      points: 25,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?auto=format&fit=crop&w=300&h=300',
      uploader: 'Sarah M.'
    },
    {
      id: '2',
      title: 'Summer Floral Dress',
      category: 'Dresses',
      size: 'S',
      condition: 'Excellent',
      points: 30,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=300&h=300',
      uploader: 'Emma K.'
    },
    {
      id: '3',
      title: 'Designer Sneakers',
      category: 'Shoes',
      size: '9',
      condition: 'Good',
      points: 40,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=300&h=300',
      uploader: 'Mike D.'
    }
  ];
  return res.status(200).json({
    message: 'Featured items fetched successfully',
    featuredItems
  });
};

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
