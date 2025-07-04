const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: {
        type: String,
        enum: ["todo", "in-progress", "done"],
        default: "todo"
    },
    dueDate: { type: Date },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
