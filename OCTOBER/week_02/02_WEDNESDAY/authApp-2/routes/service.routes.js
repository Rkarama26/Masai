

const express = require('express');
const ServiceModel = require('../models/service.model');
const authMiddleware = require('../middleware/auth.middlware');
const serviceRouter = express.Router();

// serviceRouter.use(authMiddleware("user"))



serviceRouter.post("/", authMiddleware(["user"]), async (req, res) => {
    try {
        const booking = new ServiceModel({
            serviceName: req.body.serviceName,
            userId: req.user, // extracted from JWT
            status: "pending"
        });
        await booking.save();
        res.status(201).json({ message: "Booking created successfully", booking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// for admin-role fetch all , for user-role only that user bookings serviceRouter.get("/",  async (req, res) => {
serviceRouter.get("/", authMiddleware(["admin", "user"]), async (req, res) => {
    try {
        let filter = {};

        if (req.user.role === "user") {
            filter = { userId: req.user.id }; // user sees only their bookings
        }
        // admins see all, so filter remains empty

        const bookings = await ServiceModel.find(filter).populate("userId", "username email");
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
    }
});

//  Update Booking (only if pending)
serviceRouter.put("/:id", authMiddleware(["user"]), async (req, res) => {
    try {
        const booking = await ServiceModel.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        if (booking.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized: cannot update others' bookings" });
        }

        if (booking.status !== "pending") {
            return res.status(400).json({ message: "Cannot update after approval/rejection" });
        }

        booking.serviceName = req.body.serviceName || booking.serviceName;
        await booking.save();
        res.json({ message: "Booking updated successfully", booking });
    } catch (error) {
        res.status(500).json({ message: "Failed to update booking", error: error.message });
    }
});

// Delete Booking (User - only if pending)
// user can cancle , admin can delete
serviceRouter.delete("/:id", authMiddleware(["admin", "user"]), async (req, res) => {
    try {
        const booking = await ServiceModel.findById(req.params.id);

        if (!booking) return res.status(404).json({ message: "Booking not found" });

        if (req.user.role === "admin") {
            await booking.deleteOne();
            return res.json({ message: "Booking deleted by admin" });
        }

        if (booking.userId.toString() !== req.user.id.toString())
            return res.status(403).json({ message: "Unauthorized" });

        if (booking.status !== "pending")
            return res.status(400).json({ message: "Only pending bookings can be cancelled" });

        booking.status = "cancelled";
        await booking.save();
        res.json({ message: "Booking cancelled successfully", booking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//   Approve Booking (Admin only)
serviceRouter.patch("/:id/approve", authMiddleware(["admin"]), async (req, res) => {
    try {
        if (req.user.role !== "admin")
            return res.status(403).json({ message: "Admin access required" });

        const booking = await ServiceModel.findByIdAndUpdate(
            req.params.id,
            { status: "approved" },
            { new: true }
        );

        if (!booking) return res.status(404).json({ message: "Booking not found" });
        res.json({ message: "Booking approved", booking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//  Reject Booking (Admin only)
serviceRouter.patch("/:id/reject", authMiddleware(["admin"]), async (req, res) => {
    try {
        if (req.user.role !== "admin")
            return res.status(403).json({ message: "Admin access required" });

        const booking = await ServiceModel.findByIdAndUpdate(
            req.params.id,
            { status: "rejected" },
            { new: true }
        );

        if (!booking) return res.status(404).json({ message: "Booking not found" });
        res.json({ message: "Booking rejected", booking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = serviceRouter;