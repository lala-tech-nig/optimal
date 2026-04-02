const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String },
  industry: { type: String },
  inquiryType: { type: String, default: 'General Consultation' },
  message: { type: String },
  status: { type: String, enum: ['New', 'Contacted', 'Closed'], default: 'New' }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
