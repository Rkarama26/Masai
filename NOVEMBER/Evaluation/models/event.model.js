const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["concert", "sports", "conference", "comedy"], //  category
  },
  date: {
    type: Date,
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const EventModel = mongoose.model("Event", eventSchema);

module.exports = EventModel;
