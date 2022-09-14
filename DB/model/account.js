const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
    _id: { type: mongoose.ObjectId, required: true },
    pro: String,
    name: String,
    chatId: { type: mongoose.ObjectId, required: true },
});

const groupSchema = new mongoose.Schema({
    chatId: { type: mongoose.ObjectId, required: true }, // group chatId here
    name: String,
});

const feedSchema = new mongoose.Schema({
    feedId: { type: mongoose.ObjectId },
    userId: { type: mongoose.ObjectId },
});

const msgNotificationSchema = new mongoose.Schema({
    // friend: { type: friendSchema, required: true },
    friendId: { type: mongoose.ObjectId, required: true },
    pro: String,
    name: String,
    chatName: String,
    chatId: String,
    count: { type: Number },
    lastMsg: { type: String },
});

const friendNotification = new mongoose.Schema({
    friendId: { type: mongoose.ObjectId, required: true }, // friend Id
    pro: String,
    name: String,
    requestMsg: String,
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
            type: [feedSchema],
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

// let obj = {
//     email: "lily@gmail.com",
//     pro: "",
//     firstName: "lily",
//     lastName: "lele",
//     hash: "$2b$10$wGSBdHHrPU4ReL6e.HAtaOS2Nuoobzu/2BHTnqO1dGqx9VxBrpW5e",
//     salt: "$2b$10$wGSBdHHrPU4ReL6e.HAtaO",
//     group: [
//         {
//             chatId: "6316098a46b6cd313c1df820",
//             name: "随便名字2",
//             _id: "6316098a46b6cd313c1df826",
//         },
//     ],
//     feed: [
//         {
//             feedId: "631aaeec630728f335b85ccb",
//             userId: "63111e330aa35f13039d3588",
//             _id: "631aaeec630728f335b85ccd",
//         },
//         {
//             feedId: "631ab0326f61428666bda473",
//             userId: "630e366c3f6a501068acb894",
//             _id: "631ab0326f61428666bda475",
//         },
//     ],
//     friend: [
//         {
//             _id: "630e366c3f6a501068acb894",
//             pro: "",
//             name: "fans jia",
//             chatId: "6312235e641757dae80196d8",
//         },
//         {
//             _id: "63111e330aa35f13039d3588",
//             pro: "",
//             name: "fir las",
//             chatId: "631607e746b6cd313c1df7ea",
//         },
//     ],
//     msgNotification: [],
//     friendNotification: [],
// };
