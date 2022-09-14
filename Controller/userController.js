const {
    repoUserByEmail,
    repoUserByName,
    repoFriendByName,
    repoAddFriend,
    repoDeleteFriend,
    repoDeleteGroup,
} = require("../Repository/userRepo");
const {
    repoAddChat,
    repoRemoveChat,
    repoGroupRemoveFriend,
    repoGroupGetNumUser,
} = require("../Repository/chatRepo");
// const { filterUser } = require("./helper");

async function getUser(req, res) {
    // 目前这个 function 只在 initUser 的时候用过
    let { email } = req.query;
    let got = await repoUserByEmail(email);
    let copy = { ...got }._doc;
    delete copy.password;
    delete copy.salt;
    if (copy.msgNotification == undefined) copy.msgNotificationCount = 0;
    else {
        copy.msgNotificationCount = copy.msgNotification.reduce(
            (a, b) => a + b.count,
            0
        );
    }
    if (copy.friendNotification == undefined) copy.friendNotificationCount = 0;
    else {
        copy.friendNotificationCount = copy.friendNotification.reduce(
            (a, b) => a + b.count,
            0
        );
    }
    delete copy.msgNotification;
    delete copy.friendNotification;
    res.json(copy);
}

async function getUserByName(req, res) {
    let { text } = req.query;
    // console.log(text);
    let got = await repoUserByName(text);
    res.json(got);
}
async function getFriendByName(req, res) {
    let { _id, text } = req.query;
    console.log("id text", _id, text);
    let listFriend = await repoFriendByName(_id, text);
    res.json(listFriend);
}

async function addFriend(req, res) {
    let { self, other } = req.body;
    // console.log('correct self other', self, other);
    // 1 创建 chat - chat id，
    let chatId = await repoAddChat([self._id, other._id]);
    // 2 在俩人的 friend[] 里面，都加入各自
    let a1 = await repoAddFriend(self._id, other, chatId);
    // console.log('add friend res', a1);
    let a2 = await repoAddFriend(other._id, self, chatId);
    // 3 返还给 client，新添加成功了的 user
    res.json({ other, chatId: chatId });
}

async function deleteFriend(req, res) {
    let { user1, user2, chatId } = req.body;
    // console.log('user1, user2, chatId', user1, user2, chatId);
    await repoRemoveChat(chatId);
    await repoDeleteFriend(user1, user2);
    await repoDeleteFriend(user2, user1);
    res.send("ok");
}

async function leaveGroup(req, res) {
    let { _id, chatId } = req.query;
    await repoDeleteGroup(_id, chatId);
    await repoGroupRemoveFriend(_id, chatId);
    res.send(chatId);
    let count = await repoGroupGetNumUser(chatId);
    if (count === 0) repoRemoveChat(chatId);
}

module.exports = {
    getUser,
    getUserByName,
    getFriendByName,
    addFriend,
    deleteFriend,
    leaveGroup,
};
