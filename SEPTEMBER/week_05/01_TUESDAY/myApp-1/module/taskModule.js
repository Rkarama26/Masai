const mongoose = require('mongoose')


const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, trim: true },
    isCompleted: { type: Boolean, default: false },
    dueDate: { type: Date, required: true },
    completionDate: { type: Date },
    priority: { tyep: String, enum: ["low", "medium", "high"] }
})

const TaskModel = new mongoose.model("task", TaskSchema);

module.exports = TaskModel