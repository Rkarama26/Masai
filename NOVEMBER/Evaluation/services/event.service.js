const EventModel = require("../models/event.model");

async function createEventService(eventData) {
  const { name, category, date, basePrice } = eventData;

  if (!name || !category || !date || !basePrice) {
    throw new Error("All fields (name, category, date, basePrice) are required");
  }

  const event = await EventModel.create({
    name,
    category,
    date,
    basePrice,
  });

  return event;
}

async function getAllEventsService() {
  const events = await EventModel.find().sort({ date: 1 }); // upcoming first
  return events;
}

module.exports = { createEventService, getAllEventsService };
