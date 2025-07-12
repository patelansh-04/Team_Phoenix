const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const Item = require('../models/Item.model');
const User = require('../models/User.model');

// All routes require authentication and admin role
router.use(authMiddleware, adminMiddleware);

// Get pending items for approval
router.get('/pending-items', async (req, res) => {
    try {
        const items = await Item.find({ status: 'PENDING_APPROVAL' })
            .populate('owner', 'name email')
            .sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get reported or flagged items
router.get('/reported-items', async (req, res) => {
    try {
        const items = await Item.find({ isReported: true })
            .populate('owner', 'name email')
            .sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get platform statistics
router.get('/statistics', async (req, res) => {
    try {
        const [totalUsers, totalItems, totalSwaps, pendingItems] = await Promise.all([
            User.countDocuments(),
            Item.countDocuments(),
            SwapRequest.countDocuments({ status: 'COMPLETED' }),
            Item.countDocuments({ status: 'PENDING_APPROVAL' })
        ]);

        res.json({
            totalUsers,
            totalItems,
            totalSwaps,
            pendingItems
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
