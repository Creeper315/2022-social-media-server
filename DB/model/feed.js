const mongoose = require("mongoose");
const msgSchema = require("./msg");

const feedSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.ObjectId,
            required: true,
        },

        pro: {
            type: String,
        },
        name: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        comment: {
            type: [msgSchema],
        },
    },
    { collection: "Feed" }
);

module.exports = mongoose.model("Feed", feedSchema);
