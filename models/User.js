const mongoose = require('../config/db');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  provider: { type: String, required: true },
  providerId: { type: String, required: true, unique: true },
  accessLevel: {
    type: String,
    enum: ['admin', 'employee', 'user'],
    default: 'user'
  },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
module.exports = User;