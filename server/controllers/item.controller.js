import asyncHandler from 'express-async-handler';
import Item from '../models/Item.js';

// GET /api/items
export const getItems = asyncHandler(async (_, res) => {
  const items = await Item.find({ status: 'available' }).populate('owner', 'name');
  res.json(items);
});

// GET /api/items/:id
export const getItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id).populate('owner', 'name');
  if (!item) throw new Error('Item not found');
  res.json(item);
});

// POST /api/items
export const createItem = asyncHandler(async (req, res) => {
  const item = await Item.create({ ...req.body, owner: req.user._id });
  res.status(201).json(item);
});

// PUT /api/items/:id
export const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) throw new Error('Item not found');
  if (!item.owner.equals(req.user._id) && !req.user.isAdmin)
    return res.status(403).json({ message: 'Forbidden' });
  Object.assign(item, req.body);
  await item.save();
  res.json(item);
});

// DELETE /api/items/:id
export const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) throw new Error('Item not found');
  if (!item.owner.equals(req.user._id) && !req.user.isAdmin)
    return res.status(403).json({ message: 'Forbidden' });
  await item.deleteOne();
  res.json({ success: true });
});
