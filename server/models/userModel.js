// user.model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  type: {
    type: String,
    enum: ['admin', 'regular'],
    default: 'regular',
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', userSchema);
