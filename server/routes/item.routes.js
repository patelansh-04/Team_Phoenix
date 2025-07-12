// routes/item.routes.js
import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createItem,
  deleteItem,
  getItem,
  getItems,
  updateItem
} from '../controllers/item.controller.js';

export default Router()
  .get('/', getItems)
  .post('/', protect, createItem)
  .get('/:id', getItem)
  .put('/:id', protect, updateItem)
  .delete('/:id', protect, deleteItem);
