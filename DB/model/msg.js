const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema({
    chatId: { type: mongoose.ObjectId, required: true },
    senderId: { type: mongoose.ObjectId, required: true },
    text: { type: String, required: true },
    pro: { type: String },
    name: { type: String, required: true },
    time: String, // 储存time zone 等于 0 的时间。display 的时候就是 ex: Feb 28, 2022, 11:00 PM  ，，，， Feb 3, 2022, 8:55 AM
});

// 注意！这个 schema 只是用来 format feed 的 评论，和 chat message 的，
// 这个 schema 没有储存到 mongodb 里面，所以不是一个 table

module.exports = msgSchema;
