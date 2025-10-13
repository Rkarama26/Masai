
const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    plan: { type: String, enum: ["free", "premium", "pro"], default: "free" },
    startDate: { type: Date, default: Date.now() },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ["active", "expired", "cancelled"], default: 'active' },
    discount: {
        type: Number,
        default: 0 
    },
    renewable: {
        type: Boolean,
        default: true
    },
})

const SubscriptionModel = new mongoose.model("Subscription", subscriptionSchema);

module.exports = SubscriptionModel;