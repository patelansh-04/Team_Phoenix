import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: String,
    images: [String], // store URLs or file names
    condition: {
      type: String,
      enum: ['new', 'like new', 'good', 'fair', 'poor'],
      default: 'good'
    },
    status: {
      type: String,
      enum: ['available', 'pending', 'swapped'],
      default: 'available'
    },
    pointsValue: { type: Number, default: 10 }
  },
  { timestamps: true }
);

export default mongoose.model('Item', itemSchema);
