const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '/placeholder.svg?height=200&width=400',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  reporter: {
    type: String,
    required: true,
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;