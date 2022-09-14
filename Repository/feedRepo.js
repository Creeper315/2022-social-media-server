const FeedModel = require("../DB/model/feed");
const AccountModel = require("../DB/model/account");

async function repoAddFeed(_id, pro, name, text) {
    // console.log("add feed", _id, pro, name, text);

    let newFeed = {
        user: _id,
        pro,
        name,
        text,
    };
    let result = await FeedModel.insertMany([newFeed]);

    return result[0]._id;
}

async function repoGetFeed(_id) {
    let result = await FeedModel.findOne({ _id });
    return result;
}

async function repoGetUserFeed(_id) {
    // input User id, output: listFeedId
    let result = await AccountModel.findOne({ _id }, { feed: 1 });
    // console.log("GET U F", result);
    return result.feed;
}

module.exports = { repoAddFeed, repoGetFeed, repoGetUserFeed };
