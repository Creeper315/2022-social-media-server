const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    _id: { type: mongoose.ObjectId, required: true },
    pro: String,
    name: String,
    chatId: { type: String, required: true },
});

const accountSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        pro: {
            type: String,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        hash: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
            required: true,
        },
        friend: {
            type: [friendSchema],
        },
        group: {
            type: [mongoose.ObjectId],
        },
        feed: {
            type: [mongoose.ObjectId],
        },
    },
    { collection: 'Account' }
);

module.exports = mongoose.model('Account', accountSchema);
