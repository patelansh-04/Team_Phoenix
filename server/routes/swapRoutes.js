const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const {
    createSwapRequest,
    getUserSwapRequests,
    respondToSwapRequest
} = require('../controllers/swapController');

// All routes require authentication
router.use(authMiddleware);

// Create a swap request
router.post('/', createSwapRequest);

// Get user's swap requests
router.get('/user', getUserSwapRequests);

// Respond to a swap request
router.put('/:id/respond', respondToSwapRequest);

module.exports = router;
