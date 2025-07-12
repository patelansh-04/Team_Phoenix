// models/Item.js
const { Schema, model, Types } = require('mongoose');

const ItemSchema = new Schema(
  {
    owner: { type: Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    description: String,
    category: String,
    type: String,          // top, bottom...
    size: String,
    condition: String,
    tags: [String],
    images: [String],
    status: {
      type: String,
      enum: ['AVAILABLE', 'PENDING_SWAPPED', 'SWAPPED'],
      default: 'AVAILABLE',
    },
  },
  { timestamps: true }
);

ItemSchema.index({ title: 'text', tags: 1, category: 1 }); // search speed

module.exports = model('Item', ItemSchema);
