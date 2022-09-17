const {
    repoGetFriendNotification,
    repoGetMsgNotification,
    repoAddMessageNoti,
    repoAddFriendNoti,
    repoDeleteNotification,
} = require("../Repository/notificationRepo");

const { repoGetChatName } = require("../Repository/chatRepo");

async function getNotification(req, res) {
    let { type, _id } = req.query;

    // console.log("getnotification type, _id: ", type, _id);

    if (type === "msg") {
        let result = await repoGetMsgNotification(_id);
        res.json(result);
        return;
    }
    if (type === "friend") {
        let result = await repoGetFriendNotification(_id);
        // console.log("fr no result: ", _id, result);
        res.json(result);
        return;
    }
}

async function addNotification(req, res) {
    // const msgObj = {
    //     chatId: ChatInfo.chatId,
    //     text: Msg.current,
    //     senderId: this_user._id,
    //     pro: this_user.pro,
    //     time: "2022-09-01",
    //     name: this_user.name,
    // };
    let { type, _id, obj } = req.body;
    let chat = await repoGetChatName(obj.chatId);
    // console.log("chat found", chat);
    let chatObj = {};
    if (chat.name) chatObj = { chatName: chat.name, ...obj };
    else chatObj = { chatName: obj.name, ...obj };
    // console.log("new obj", chatObj);

    if (type == "msg") await repoAddMessageNoti(_id, chatObj);
    else if (type == "friend") await repoAddFriendNoti(_id, obj);

    res.send();
}

async function deleteNotification(req, res) {
    let { _id, type, chatId, friendId } = req.body;
    // console.log("_id, type, chatId, friendId: ", _id, type, chatId, friendId);
    await repoDeleteNotification({ _id, type, chatId, friendId });
    res.send();
}

async function addFriendNotification(req, res) {
    let { requester, receiver, requestMsg } = req.body;
    let isNewRequest = await repoAddFriendNoti(
        receiver._id,
        requester,
        requestMsg
    );
    res.send(isNewRequest);
}

module.exports = {
    getNotification,
    addNotification,
    deleteNotification,
    addFriendNotification,
};
