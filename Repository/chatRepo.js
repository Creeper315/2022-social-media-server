//
const ChatModel = require("../DB/model/chat");

async function repoAddChat(listUserId, name) {
    let result = await ChatModel.insertMany([
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

async function repoGetChatName(chatId) {
    return await ChatModel.findOne({ _id: chatId }, { name: 1 });
}

async function repoRemoveChat(chatId) {
    // console.log("delet ct id", chatId);
    let r = await ChatModel.deleteOne({ _id: chatId });
    // console.log("delete cid r", r);
}

async function repoChatHistory(chatId, curNumMsg, msgLoadAmount) {
    // console.log("finding msg for cid:", chatId, curNumMsg, msgLoadAmount);
    let result = await ChatModel.findOne(
        {
            _id: chatId,
        },
        { message: { $slice: [curNumMsg, msgLoadAmount] } }
    );
    // console.log("chat found", result);
    return result.message;
}

async function repoAddChatMsg(msgObj) {
    let result = await ChatModel.updateOne(
        { _id: msgObj.chatId },
        { $push: { message: { $each: [msgObj], $position: 0 } } }
    );
}

async function repoGetChatUser(chatId) {
    let result = await ChatModel.findOne(
        {
            _id: chatId,
        },
        {
            user: 1,
        }
    );
    return result.user;
}

async function repoGroupRemoveFriend(_id, chatId) {
    let r = await ChatModel.updateOne(
        { _id: chatId },
        { $pull: { user: _id } }
    );
}

async function repoGroupGetNumUser(chatId) {
    // let num = await ChatModel.aggregate([
    //     { $match: { _id: chatId } },
    //     { $project: { countUser: { $size: "$user" } } },
    // ]);
    let arr = await ChatModel.findOne({ _id: chatId }, { user: 1 });
    return arr.user.length;
}

module.exports = {
    repoAddChat,
    repoGetChatName,
    repoRemoveChat,
    repoChatHistory,
    repoAddChatMsg,
    repoGetChatUser,
    repoGroupGetNumUser,
    repoGroupRemoveFriend,
};
