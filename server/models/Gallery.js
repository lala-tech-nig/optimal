const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  coverImage: {
    type: String,
    required: true,
  },
  images: [{
    type: String
  }],
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
