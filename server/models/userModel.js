// user.model.js
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    require:true,
    unique: true
  },
  email: {
    type: String,
    require:true,
    unique: true,
  },
  password: 
  {
    type: String,
    require:true,
    unique: true
  },
  type: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

export default model("User", userSchema);
