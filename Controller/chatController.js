const ChatModel = require("../DB/model/chat");

const {
    repoChatHistory,
    repoAddChat,
    repoAddChatMsg,
} = require("../Repository/chatRepo");

async function getChatHistory(req, res) {
    const { chatId, curNumMsg, msgLoadAmount } = req.body;
    let result = await repoChatHistory(chatId, curNumMsg, msgLoadAmount);
    res.json(result);
}

async function addChatMsg(req, res) {
    const { chatId, msgObj } = req.body;
    await repoAddChatMsg(chatId, msgObj);
    res.send("ok");
}

async function createGroup(req, res) {
    // create chat group
    // 新建 chatId table
    // 把所有这个 friend 加到同一个 chatId
    let { friend } = req.body;
    let listUserId = friend.map((e) => e._id);
    const chatName = "随便名字";
    let chatId = await repoAddChat(listUserId, chatName);
    console.log(chatId, chatName);
    res.json({ chatId, name: chatName, listUserId });
}

module.exports = { getChatHistory, addChatMsg, createGroup };
