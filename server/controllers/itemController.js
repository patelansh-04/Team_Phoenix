const Item = require('../models/Item.model');

const getAllItems = async (req, res) => {
  try {
    let items;
    if (req.user && req.user.role === 'admin') {
      items = await Item.find().populate('owner', 'name email'); // Admins can see all items
    } else {
      items = await Item.find({ status: 'AVAILABLE' }).populate('owner', 'name email'); // Public items
    }
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

const createItem = async (req, res) => {
  try {
    const item = await Item.create({ ...req.body, owner: req.user._id });
    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Failed to create item' });
  }
};

const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('owner', 'name email');
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ error: 'Failed to fetch item' });
  }
};

module.exports = {
  getAllItems,
  createItem,
  getItemById
};
