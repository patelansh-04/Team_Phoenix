// models/Item.js
const { Schema, model, Types } = require('mongoose');

const ItemSchema = new Schema(
  {
    owner: { type: Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: String, required: true },
    condition: { 
      type: String, 
      required: true,
      enum: ['New', 'Like New', 'Good', 'Fair', 'Poor']
    },
    points: { type: Number, required: true },
    tags: [String],
    images: [{ type: String, required: true }],
    status: {
      type: String,
      enum: ['PENDING_APPROVAL', 'AVAILABLE', 'PENDING_SWAP', 'SWAPPED', 'REMOVED'],
      default: 'PENDING_APPROVAL',
    },
    views: { type: Number, default: 0 },
    likes: [{ type: Types.ObjectId, ref: 'User' }],
    approvedBy: { type: Types.ObjectId, ref: 'User' },
    approvedAt: Date,
    reasonForRemoval: String,
    removedBy: { type: Types.ObjectId, ref: 'User' },
    removedAt: Date,
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

ItemSchema.index({ title: 'text', tags: 1, category: 1 }); // search speed

module.exports = model('Item', ItemSchema);
