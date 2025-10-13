

const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const SubscriptionModel = require("../models/subscription.model");
const UserModel = require("../models/user.model");


const subscritionRouter = express.Router();


//subscribe to plan
subscritionRouter.post("/subscribe", authMiddleware(["user", "admin"]), async (req, res) => {
    try {
        const { plan } = req.body;
        const userId = req.user.id;

        if (!["free", "premium", "pro"].includes(plan)) {
            return res.status(400).json({ error: "Invalid plan type" });
        }

        const endDate = new Date();
        if (plan !== "free") endDate.setDate(endDate.getDate() + 30);

        const subscription = await SubscriptionModel.create({
            user: userId,
            plan,
            endDate: plan === "free" ? null : endDate,
        });
        res.status(201).json({
            message: `Subscription to ${plan} plan successful`,
            subscription
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//get active subscription-plan
subscritionRouter.get("/subscription-status", authMiddleware(["user", "admin"]), async (req, res) => {
    try {
        const userId = req.user.id;
        const activeSub = await SubscriptionModel.findOne({
            user: userId,
            status: "active"
        }).sort({ endDate: -1 });

        if (!activeSub) {
            return res.status(200).json({ message: "No active subscription", plan: "free" });
        }

        if (activeSub.endDate && new Date() > activeSub.endDate) {
            activeSub.status = "expired";
            await activeSub.save();
            await User.findByIdAndUpdate(userId, { currentPlan: "free" });
            return res.status(200).json({ message: "Subscription expired", plan: "free" });
        }

        res.status(200).json({
            message: "Subscription active",
            plan: activeSub.plan,
            expiresOn: activeSub.endDate
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// PATCH /renew — Renew subscription before expiry
subscritionRouter.patch("/renew", authMiddleware(["user", "admin"]), async (req, res) => {
    try {
        const userId = req.user.id;
        const activeSub = await SubscriptionModel.findOne({ user: userId, status: "active" });

        if (!activeSub) {
            return res.status(400).json({ error: "No active subscription to renew" });
        }

        const now = new Date();
        if (activeSub.endDate && now > activeSub.endDate) {
            return res.status(400).json({ error: "Subscription already expired. Please purchase again." });
        }

        activeSub.endDate.setDate(activeSub.endDate.getDate() + 30);
        await activeSub.save();

        res.status(200).json({ message: "Subscription renewed successfully", activeSub });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

subscritionRouter.post("/cancel-subscription", authMiddleware(["user", "admin"]), async (req, res) => {
    try {
        const userId = req.user.id;
        const activeSub = await SubscriptionModel.findOne({ user: userId, status: "active" });

        if (!activeSub) {
            return res.status(400).json({ error: "No active subscription to cancel" });
        }

        activeSub.status = "cancelled";
        await activeSub.save();

        await UserModel.findByIdAndUpdate(userId, { currentPlan: "free" });

        res.status(200).json({ message: "Subscription cancelled successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = subscritionRouter;  