// user.model.js
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
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

export default model('User', userSchema);
