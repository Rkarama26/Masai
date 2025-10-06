

const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

const DocterModel = mongoose.model('Doctor', doctorSchema);
module.exports = DocterModel;