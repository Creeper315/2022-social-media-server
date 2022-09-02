const mongoose = require("mongoose");
const msgSchema = require("./msg");

const chatSchema = new mongoose.Schema(
    {
        name: String,
        user: {
            type: [mongoose.ObjectId],
            required: true,
        },
        message: {
            type: [msgSchema],
        },
    },
    { collection: "Chat" }
);

module.exports = mongoose.model("Chat", chatSchema);
