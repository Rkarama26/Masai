const express = require("express");
const ContentModel = require("../models/content.model");
const authMiddleware = require("../middleware/auth.middleware");
const SubscriptionModel = require("../models/subscription.model");

const contentRouter = express.Router();



contentRouter.get("/free", async (req, res) => {
    try {
        const content = await ContentModel.find({ category: "free" });
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

//  GET  Only premium/pro users
contentRouter.get("/premium", authMiddleware(["user", "admin"]), async (req, res) => {
    try {
        const userId = req.user.id;

        const activeSub = await SubscriptionModel.findOne({ user: userId, status: "active" });
        if (!activeSub || (activeSub.plan !== "premium" && activeSub.plan !== "pro")) {
            return res.status(403).json({ error: "Access denied. Premium/Pro plan required." });
        }

        const content = await Content.find({ category: "premium" });
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

//  POST - Only admins can create content
contentRouter.post("/", authMiddleware(["admin, user"]), async (req, res) => {
    try {
        const { title, description, category } = req.body;

        if (!["free", "premium"].includes(category)) {
            return res.status(400).json({ error: "Invalid content category" });
        }

        const newContent = await ContentModel.create({
            title,
            description,
            category,
            createdBy: req.user.id
        });

        res.status(201).json({ message: "Content created successfully", newContent });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

//  DELETE - Only admins can delete content
contentRouter.delete("/:id", authMiddleware(["admin"]), async (req, res) => {
    try {
        const { id } = req.params;
        await Content.findByIdAndDelete(id);
        res.status(200).json({ message: "Content deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = contentRouter;