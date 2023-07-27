// prompt.model.js
const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ['Edit', 'Images'],
  },
  tags: [String],
});

module.exports = mongoose.model('Prompt', promptSchema);
