// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    points: {
      type: Number,
      default: 0,
    },
    refreshTokens: [
      {
        token: String,
        expiresAt: Date,
      },
    ],
    profileImage: String,
    location: String,
    bio: String,
    rating: {
      type: Number,
      default: 0,
    },
    totalSwaps: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to add refresh token
UserSchema.methods.addRefreshToken = function (refreshToken) {
  this.refreshTokens.push({
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });

  // Remove expired tokens
  this.refreshTokens = this.refreshTokens.filter(
    (token) => token.expiresAt > new Date()
  );

  return this.save();
};

// Method to revoke refresh token
UserSchema.methods.revokeRefreshToken = function (refreshToken) {
  this.refreshTokens = this.refreshTokens.filter(
    (token) => token.token !== refreshToken
  );
  return this.save();
};

module.exports = mongoose.model('User', UserSchema);
