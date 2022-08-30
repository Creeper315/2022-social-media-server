const mongoose = require('mongoose');
const msgSchema = require('./msg');

const feedSchema = new mongoose.Schema(
    {
        pro: {
            type: String,
            required: true,
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
    { collection: 'Feed' }
);

module.exports = mongoose.model('Feed', feedSchema);
