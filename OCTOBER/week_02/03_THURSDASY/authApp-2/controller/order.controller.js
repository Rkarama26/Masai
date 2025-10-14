

const mongoose = require("mongoose");
const UserModel = require("../models/user.model");
const OrderModel = require("../models/order.model");

const createOrder = async (req, res) => {
    try {
        const { items } = req.body; // [{ dish: dishId, qty }]
        // validate items
        if (!items || !items.length) return res.status(400).json({ message: "No items" });

        // assign random chef
        const chefs = await UserModel.find({ role: "chef" });
        let assignedChef = null;
        if (chefs.length > 0) {
            const idx = Math.floor(Math.random() * chefs.length);
            assignedChef = chefs[idx]._id;
        }

        const order = await OrderModel.create({
            user: req.user.id,
            items,
            assignedChef,
            status: "Order Received"
        });

        // populate response
        await order.populate("items.dish").execPopulate?.(); // execPopulate might not be available in latest mongoose; alternatively re-query
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getOrdersForUser = async (req, res) => {
    try {
        const orders = await OrderModel.find({ user: req.user._id }).populate("items.dish assignedChef");
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find().populate("items.dish user assignedChef");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
};

const updateOrderStatusByChef = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        // allow only chef who is assigned or maybe any chef depending on rule
        const order = await OrderModel.findById(orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });

        if (!order.assignedChef || order.assignedChef.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You aren't allowed to update this order" });
        }

        // validate allowed status transitions
        const allowed = ["Preparing", "Out for Delivery", "Delivered"];
        if (!allowed.includes(status)) return res.status(400).json({ message: "Invalid status" });

        order.status = status;
        await order.save();
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = { createOrder, getOrdersForUser, getAllOrders, updateOrderStatusByChef } 