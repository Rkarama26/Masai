const { createEventService, getAllEventsService } = require("../services/event.service");

const createEvent = async (req, res) => {
  try {
    const event = await createEventService(req.body);
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    console.error(" Event creation error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await getAllEventsService();
    res.status(200).json({ events });
  } catch (error) {
    console.error(" Error fetching events:", error.message);
    res.status(500).json({ message: "Error fetching events" });
  }
};

module.exports = { createEvent, getAllEvents };
