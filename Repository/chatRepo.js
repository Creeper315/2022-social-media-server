//
const chatModel = require("../DB/model/chat");

async function repoAddChat(listUserId, name) {
    let result = await chatModel.insertMany([
        {
            name,
            user: listUserId,
        },
    ]);
    // console.log(
    //     'insert chat res',
    //     result,
    //     result[0]._id,
    //     result[0]._id.toString()
    // );
    return result[0]._id; // new added chat id, is returned.
}

async function repoRemoveChat(chatId) {
    // console.log("delet ct id", chatId);
    let r = await chatModel.deleteOne({ _id: chatId });
    // console.log("delete cid r", r);
}

async function repoChatHistory(chatId, curNumMsg, msgLoadAmount) {
    // console.log("finding msg for cid:", chatId, curNumMsg, msgLoadAmount);
    // let result = await chatModel.findOne({
    //     _id: chatId,
    //     message: { $slice: [curNumMsg - 1, msgLoadAmount] },
    // });
    let result = await chatModel.findOne(
        {
            _id: chatId,
        },
        { message: { $slice: [curNumMsg, msgLoadAmount] } }
    );
    // console.log("chat found", result);
    return result.message;
}

async function repoAddChatMsg(chatId, msgObj) {
    let result = await chatModel.updateOne(
        { _id: chatId },
        { $push: { message: msgObj } }
    );
}

module.exports = {
    repoAddChat,
    repoRemoveChat,
    repoChatHistory,
    repoAddChatMsg,
};
