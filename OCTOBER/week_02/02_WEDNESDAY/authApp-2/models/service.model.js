const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    serviceName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, enum: ["pending", "approved", "rejected", "cancelled"], default: "pending" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
})

 
const ServiceModel = new mongoose.model("Service", serviceSchema);
module.exports = ServiceModel;