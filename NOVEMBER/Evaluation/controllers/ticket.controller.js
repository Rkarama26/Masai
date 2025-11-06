const {
  bookTicketService,
  cancelTicketService,
} = require("../services/ticket.service");

const bookTicket = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId, quantity } = req.body;

    if (!eventId || !quantity) {
      return res
        .status(400)
        .json({ message: "eventId and quantity are required" });
    }

    const result = await bookTicketService(userId, eventId, quantity);

    res.status(201).json({
      message: "Booking successful and confirmation email sent!",
      ticket: result.ticket,
    });
  } catch (error) {
    console.error("Booking error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const cancelTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const userId = req.user.id;

    const result = await cancelTicketService(ticketId, userId);

    res.status(200).json(result);
  } catch (error) {
    console.error(" Cancel booking error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { bookTicket, cancelTicket };
