const SwapRequestSchema = new Schema(
  {
    requester: { type: Types.ObjectId, ref: 'User', required: true },
    item: { type: Types.ObjectId, ref: 'Item', required: true },
    status: {
      type: String,
      enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'CANCELED'],
      default: 'PENDING',
    },
  },
  { timestamps: true }
);
module.exports = model('SwapRequest', SwapRequestSchema);
