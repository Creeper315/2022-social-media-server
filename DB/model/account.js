const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
    _id: { type: mongoose.ObjectId, required: true },
    pro: String,
    name: String,
    chatId: { type: mongoose.ObjectId, required: true },
});

const groupSchema = new mongoose.Schema({
    _id: { type: mongoose.ObjectId, required: true },
    name: String,
});

const msgNotificationSchema = new mongoose.Schema({
    friend: { type: friendSchema, required: true },
    count: { type: Number, require: true },
    last: { type: String },
});

const friendNotification = new mongoose.Schema({
    _id: { type: mongoose.ObjectId, required: true },
    pro: String,
    name: String,
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
            type: [groupSchema],
        },
        feed: {
            type: [mongoose.ObjectId],
        },
        msgNotification: {
            // 发送者的 _id, pro，name，chatId， 还有如果连发多个信息，最后的一个消息 text
            type: [msgNotificationSchema],
        },
        friendNotification: {
            type: [friendNotification],
        },
    },
    { collection: "Account" }
);

module.exports = mongoose.model("Account", accountSchema);
