const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User.model');
const Item = require('./models/Item.model');
require('dotenv').config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Item.deleteMany({});
    console.log('Cleared existing data');

    // Create test users
    const hashedPassword = await bcrypt.hash('password123', 12);
    
    const user1 = await User.create({
      name: 'Sarah M.',
      email: 'sarah@example.com',
      password: hashedPassword,
      role: 'user',
      points: 150
    });

    const user2 = await User.create({
      name: 'Emma K.',
      email: 'emma@example.com',
      password: hashedPassword,
      role: 'user',
      points: 200
    });

    const user3 = await User.create({
      name: 'Mike D.',
      email: 'mike@example.com',
      password: hashedPassword,
      role: 'user',
      points: 100
    });

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@rewear.com',
      password: hashedPassword,
      role: 'admin',
      points: 1000
    });

    console.log('Created users');

    // Create test items
    const items = [
      {
        owner: user1._id,
        title: 'Vintage Denim Jacket',
        description: 'Classic vintage denim jacket in excellent condition. Perfect for layering.',
        category: 'Outerwear',
        type: 'Jacket',
        size: 'M',
        condition: 'Good',
        points: 25,
        uploader: user1.name,
        images: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?auto=format&fit=crop&w=300&h=300'],
        pointsValue: 25,
        status: 'AVAILABLE',
        approvedBy: admin._id,
        approvedAt: new Date()
      },
      {
        owner: user2._id,
        title: 'Summer Floral Dress',
        description: 'Beautiful floral print dress perfect for summer events.',
        category: 'Dresses',
        type: 'Dress',
        size: 'S',
        condition: 'Excellent',
        points: 30,
        uploader: user2.name,
        images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=300&h=300'],
        pointsValue: 30,
        status: 'AVAILABLE',
        approvedBy: admin._id,
        approvedAt: new Date()
      },
      {
        owner: user3._id,
        title: 'Designer Sneakers',
        description: 'High-quality designer sneakers in great condition.',
        category: 'Shoes',
        type: 'Sneakers',
        size: '9',
        condition: 'Good',
        points: 40,
        uploader: user3.name,
        images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=300&h=300'],
        pointsValue: 40,
        status: 'AVAILABLE',
        approvedBy: admin._id,
        approvedAt: new Date()
      }
    ];

    await Item.insertMany(items);
    console.log('Created items');

    console.log('Database seeded successfully!');
    console.log('\nTest Accounts:');
    console.log('User 1: sarah@example.com / password123');
    console.log('User 2: emma@example.com / password123');
    console.log('User 3: mike@example.com / password123');
    console.log('Admin: admin@rewear.com / password123');

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

seedData(); 