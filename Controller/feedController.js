const feedRepo = require("../Repository/feedRepo");
const userRepo = require("../Repository/userRepo");

async function addFeed(req, res) {
    // user 的 _id, pro, name, text, 和 listFriendId
    let { _id, pro, name, text, listFriendId } = req.body; // 创建一个 feed，当前 user 和 所有 friend，都在 feed [] 里添加 feed _id
    let feedId = await feedRepo.repoAddFeed(_id, pro, name, text);
    console.log("new feed id", feedId);
    let listPro = [];
    listFriendId.push(_id);
    for (let id of listFriendId) {
        listPro.push(userRepo.repoAddFeed(id, feedId, _id));
    }
    await Promise.all(listPro);
    res.send();
}

async function getFeedHistory(req, res) {
    let { _id } = req.body;
    let listFeedId = await feedRepo.repoGetUserFeed(_id);
    // console.log("get feed hist", _id, listFeedId);
    // let friendId = await userRepo.repoGetFriendId(_id);

    let listPro = [];
    for (let { feedId } of listFeedId) {
        let r = feedRepo.repoGetFeed(feedId);
        listPro.push(r);
    }
    let listResult = await Promise.all(listPro);

    // console.log("get feed listResult", listResult);

    res.json(listResult);
}

module.exports = { addFeed, getFeedHistory };
