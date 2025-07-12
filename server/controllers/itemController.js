const Task = require('../models/Item.model');

const getAllItems = async (req, res) => {
//   try {
//     let items;
//     if (req.user.role === 'admin') {
//       items = await Item.find(); // Admins can see all items
//     } else {
//       items = await Item.find({ owner: req.user.id }); // Users see only their own items
//     }
//     res.status(200).json(items);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch items' });
//   }
    try {
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
        res.status(200).json({ message: 'Get all items', items: featuredItems });

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
};

const createItem = async (req, res) => {
  try {
    const item = await Item.create({ ...req.body, owner: req.user.id });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item' });
  }
};

module.exports = {
  getTasks,
  createTask
};
