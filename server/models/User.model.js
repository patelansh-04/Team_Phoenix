// models/User.js
const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    name: String,
    points: { type: Number, default: 0 },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);

module.exports = model('User', UserSchema);
