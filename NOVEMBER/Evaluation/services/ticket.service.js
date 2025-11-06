const EventModel = require("../models/event.model");
const TicketModel = require("../models/ticket.model");
const UserModel = require("../models/user.model");
const { sendEmail } = require("../utils/sendEmail");

async function bookTicketService(userId, eventId, quantity) {
  const event = await EventModel.findById(eventId);
  if (!event) {
    throw new Error("Event not found");
  }

  //  Fetch User
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  //  total amount
  const totalAmount = event.basePrice * quantity;

  //  Create ticket booking
  const ticket = await TicketModel.create({
    userId,
    eventId,
    quantity,
    totalAmount,
    status: "booked",
  });

  //  Send booking confirmation email
  const emailSubject = "🎟️ Booking Confirmed!";
  const emailBody = `
    <div style="font-family: Arial, sans-serif; line-height:1.5;">
      <h2>Your booking is confirmed!</h2>
      <p><strong>Event:</strong> ${event.name}</p>
      <p><strong>Category:</strong> ${event.category}</p>
      <p><strong>Date:</strong> ${new Date(event.date).toLocaleString()}</p>
      <p><strong>Quantity:</strong> ${quantity}</p>
      <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
      <br/>
      <p>Thank you for booking with <b>Book_Your_Show</b>!</p>
    </div>
  `;

  await sendEmail(user.email, emailSubject, emailBody);

  //   the booking summary
  return { ticket, event };
}

async function cancelTicketService(ticketId, userId) {
  const ticket = await TicketModel.findById(ticketId)
    .populate("eventId")
    .populate("userId");

  if (!ticket) {
    throw new Error("Ticket not found");
  }

  if (ticket.userId._id.toString() !== userId.toString()) {
    throw new Error("You are not authorized to cancel this booking");
  }

  ticket.status = "cancelled";
  await ticket.save();

  const event = ticket.eventId;
  const user = ticket.userId;

  const subject = "🎟️ Eventify - Booking Cancelled";
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; line-height:1.6;">
      <h3>Eventify - Booking Cancelled</h3>
      <p>Your booking for <strong>${event.name}</strong> has been cancelled.</p>
      <p><strong>Event Date:</strong> ${new Date(
        event.date
      ).toLocaleDateString()}</p>
      <p><strong>Tickets:</strong> ${ticket.quantity}</p>
      <p><strong>Total Amount:</strong> ₹${ticket.totalAmount}</p>
      <hr/>
      <p>We hope to see you again at another event.</p>
    </div>
  `;

  await sendEmail(user.email, subject, htmlContent);

  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
  if (superAdminEmail) {
    const adminHtml = `
      <div style="font-family: Arial, sans-serif;">
        <h3>Booking Cancelled (Admin Notification)</h3>
        <p><strong>User:</strong> ${user.username} (${user.email})</p>
        <p><strong>Event:</strong> ${event.name}</p>
        <p><strong>Quantity:</strong> ${ticket.quantity}</p>
        <p><strong>Total:</strong> ₹${ticket.totalAmount}</p>
      </div>
    `;
    await sendEmail(superAdminEmail, subject, adminHtml);
  }

  return { message: "Booking cancelled successfully" };
}

module.exports = { bookTicketService, cancelTicketService };
