const  mongoose = require("mongoose");


const contentSchema = new mongoose.Schema({

    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ["free", "premium"], default: "free" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now() }

})

const ContentModel = new mongoose.model('Content', contentSchema);
module.exports = ContentModel;