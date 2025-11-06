const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Ref to User
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true, // Ref to Event
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  totalAmount: {
    type: Number,
    required: true, // Computed from event basePrice × quantity
  },
  status: {
    type: String,
    enum: ["booked", "cancelled"],
    default: "booked", // Default booked
  },
  bookedAt: {
    type: Date,
    default: Date.now, 
  },
});

// Automatically compute totalAmount before saving
ticketSchema.pre("save", async function (next) {
  if (!this.isModified("totalAmount")) {
    const Event = mongoose.model("Event");
    const event = await Event.findById(this.eventId);
    if (event) {
      this.totalAmount = event.basePrice * this.quantity;
    }
  }
  next();
});

const TicketModel = mongoose.model("Ticket", ticketSchema);

module.exports = TicketModel;
