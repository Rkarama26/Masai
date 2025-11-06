const TicketModel = require("../models/ticket.model");

async function generateAdminReportService() {
  const pipeline = [
    //  Lookup Event data
    {
      $lookup: {
        from: "events", // name of the Event collection
        localField: "eventId",
        foreignField: "_id",
        as: "eventDetails",
      },
    },
    { $unwind: "$eventDetails" },

    // 2 Lookup User data (optional, for avgSpendPerUser)
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    { $unwind: "$userDetails" },

    //Group by category and compute totals
    {
      $group: {
        _id: "$eventDetails.category",
        totalBookings: { $sum: 1 },
        totalTickets: { $sum: "$quantity" },
        totalRevenue: { $sum: "$totalAmount" },
      },
    },

    //  Rename fields for output clarity
    {
      $project: {
        _id: 0,
        category: "$_id",
        bookings: "$totalBookings",
        tickets: "$totalTickets",
        revenue: "$totalRevenue",
      },
    },
  ];

  const categoryBreakdown = await TicketModel.aggregate(pipeline);

  //  Compute overall totals
  const totalBookings = categoryBreakdown.reduce(
    (sum, c) => sum + c.bookings,
    0
  );
  const totalRevenue = categoryBreakdown.reduce((sum, c) => sum + c.revenue, 0);

  // Count distinct users for avg spend calculation
  const uniqueUsers = await TicketModel.distinct("userId");
  const avgSpendPerUser =
    uniqueUsers.length > 0 ? totalRevenue / uniqueUsers.length : 0;

  const summary = {
    totalBookings,
    totalRevenue,
    avgSpendPerUser: Math.round(avgSpendPerUser),
    categoryBreakdown,
  };

  return summary;
}

module.exports = { generateAdminReportService };
