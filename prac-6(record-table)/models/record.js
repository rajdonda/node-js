const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  hobbies: {
    type: [String],
    default: []
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },
  city: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Record', recordSchema);