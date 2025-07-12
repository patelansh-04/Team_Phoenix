const { Schema, model, Types } = require('mongoose');

const SwapRequestSchema = new Schema(
  {
    requestor:      { type: Types.ObjectId, ref: 'User', required: true },
    owner:          { type: Types.ObjectId, ref: 'User', required: true },
    requestedItem:  { type: Types.ObjectId, ref: 'Item', required: true },
    offeredItems:   [{ type: Types.ObjectId, ref: 'Item' }],
    pointsOffered:  { type: Number, default: 0 },
    message:        { type: String },
    responseMessage:{ type: String },
    isPointsRequest:{ type: Boolean, default: false },
    status: {
      type: String,
      enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED', 'CANCELED'],
      default: 'PENDING',
    },
    completedAt:    { type: Date }
  },
  { timestamps: true }
);

module.exports = model('SwapRequest', SwapRequestSchema);
