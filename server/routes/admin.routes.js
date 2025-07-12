// routes/admin.routes.js
import { Router } from 'express';
import { admin, protect } from '../middleware/authMiddleware.js';
import { getAllUsers } from '../controllers/admin.controller.js';

export default Router().get('/users', protect, admin, getAllUsers);
