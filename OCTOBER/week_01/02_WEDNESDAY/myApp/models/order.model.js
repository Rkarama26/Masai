const mongoose = require('mongoose');
 
const orderSchema = new mongoose.Schema({
    orderName: { type: String, required: true },
    orderAmount: { type: Number, required: true },
    deliveryStatus: { type: Boolean, default: false },
    modeOfPayment: { type: String, required: true },
    state: { type: String, enum: ["COD", "UPI", "NETBANKING"] },
    // establish relationship with user - document by refrence
    orderedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" }// this should be userId from User Collection
})

const OrderModel = mongoose.model('order', orderSchema);
module.exports = OrderModel;