// prompt.model.js
import { Schema, model } from 'mongoose';

const promptSchema = new Schema({
  name: String,
  type: {
    type: String,
    enum: ['Edit', 'Images', 'Completitions'],
  },
  instruction: {
    type: String,
    require: true
  },
  userId: {
    type: mongoose.ObjectId,
    require: true,
  },
  tags: [String],
});

export default model('Prompt', promptSchema);
