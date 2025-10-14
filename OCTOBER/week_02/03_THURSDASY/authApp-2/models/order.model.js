const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            dish: { type: mongoose.Schema.Types.ObjectId, ref: "Dish", required: true },
            qty: { type: Number, default: 1 } // minimum 1 
        }
    ],
    status: {
        type: String,
        enum: ["Order Received", "Preparing", "Out for Delivery", "Delivered"],
        default: "Order Received"
    },
    assignedChef: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now }
}); 


const OrderModel = new mongoose.model("Order", orderSchema);

module.exports = OrderModel;