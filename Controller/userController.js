const e = require('express');
const {
    repoUserByEmail,
    repoUserByName,
    repoAddFriend,
    repoDeleteFriend,
} = require('../Repository/userRepo');
const { repoAddChat, repoRemoveChat } = require('../Repository/chatRepo');
const { filterUser } = require('./helper');

async function getUser(req, res) {
    let { email } = req.query;
    let got = await repoUserByEmail(email);
    // console.log('this_user', got);
    res.json(got);
}

async function getUserByName(req, res) {
    let { text } = req.query;
    // console.log(text);
    let got = await repoUserByName(text);
    res.json(got);
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
    console.log('user1, user2, chatId', user1, user2, chatId);
    await repoRemoveChat(chatId);
    await repoDeleteFriend(user1, user2);
    await repoDeleteFriend(user2, user1);
    res.send('ok');
}

module.exports = { getUser, getUserByName, addFriend, deleteFriend };
