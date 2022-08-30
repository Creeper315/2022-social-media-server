const ChatModel = require('../DB/model/chat');

const {
    repoChatHistory,
    // repoAddChat,
    repoAddChatMsg,
} = require('../Repository/chatRepo');

async function getChatHistory(req, res) {
    const { chatId, curNumMsg, msgLoadAmount } = req.body;
    let result = await repoChatHistory(chatId, curNumMsg, msgLoadAmount);
    res.json(result);
}

async function addChatMsg(req, res) {
    const { chatId, msgObj } = req.body;
    await repoAddChatMsg(chatId, msgObj);
    res.send('ok');
}

module.exports = { getChatHistory, addChatMsg };
