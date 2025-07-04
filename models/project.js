const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ["active", "completed"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{
    timestamps:true
});

module.exports = mongoose.model("Project", projectSchema);
