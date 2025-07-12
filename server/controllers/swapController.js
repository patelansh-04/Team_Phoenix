const SwapRequest = require('../models/SwapRequest.model');
const Item = require('../models/Item.model');
const User = require('../models/User.model');

// Create a swap request
const createSwapRequest = async (req, res) => {
    try {
        const { requestedItem, offeredItems, pointsOffered, message } = req.body;
        
        // Validate item exists and is available
        const item = await Item.findById(requestedItem);
        if (!item || item.status !== 'AVAILABLE') {
            return res.status(400).json({ message: 'Item is not available for swap' });
        }

        // Create swap request
        const swapRequest = await SwapRequest.create({
            requestor: req.user.id,
            owner: item.owner,
            requestedItem,
            offeredItems,
            pointsOffered,
            message,
            isPointsRequest: !offeredItems || offeredItems.length === 0
        });

        // Update item status
        await Item.findByIdAndUpdate(requestedItem, { status: 'PENDING_SWAP' });

        res.status(201).json(swapRequest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get swap requests for a user
const getUserSwapRequests = async (req, res) => {
    try {
        const swaps = await SwapRequest.find({
            $or: [{ requestor: req.user.id }, { owner: req.user.id }]
        })
        .populate('requestedItem')
        .populate('offeredItems')
        .populate('requestor', 'name profileImage rating')
        .populate('owner', 'name profileImage rating')
        .sort({ createdAt: -1 });

        res.status(200).json(swaps);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Respond to swap request
const respondToSwapRequest = async (req, res) => {
    try {
        const { status, responseMessage } = req.body;
        const swap = await SwapRequest.findById(req.params.id);

        if (!swap) {
            return res.status(404).json({ message: 'Swap request not found' });
        }

        // Verify ownership
        if (swap.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // Handle points-based swap
        if (swap.isPointsRequest && status === 'ACCEPTED') {
            const requestor = await User.findById(swap.requestor);
            const owner = await User.findById(swap.owner);

            if (requestor.points < swap.pointsOffered) {
                return res.status(400).json({ message: 'Insufficient points' });
            }

            // Transfer points
            requestor.points -= swap.pointsOffered;
            owner.points += swap.pointsOffered;

            await requestor.save();
            await owner.save();
        }

        // Update swap request
        swap.status = status;
        swap.responseMessage = responseMessage;
        if (status === 'COMPLETED') {
            swap.completedAt = Date.now();
        }
        await swap.save();

        // Update item status
        const item = await Item.findById(swap.requestedItem);
        item.status = status === 'ACCEPTED' ? 'SWAPPED' : 'AVAILABLE';
        await item.save();

        // If accepted, update offered items status
        if (status === 'ACCEPTED' && swap.offeredItems?.length > 0) {
            await Item.updateMany(
                { _id: { $in: swap.offeredItems } },
                { status: 'SWAPPED' }
            );
        }

        res.status(200).json(swap);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createSwapRequest,
    getUserSwapRequests,
    respondToSwapRequest
};
