// const conn = require('../DB/connect');
const AccountModel = require("../DB/model/account");

// let acc = new AccountModel({
//     email: 'a@gmail.com',
//     password: 'psss222',
// });

// acc.save()
//     .then((e) => {
//         console.log('saved', e);
//     })
//     .catch((e) => console.log('err', e));

async function repoAddFriend(addToUserId, userObj, chatId) {
    // console.log('add to usr id', addToUserId);
    // console.log('combined', { ...userObj, chatId: chatId });

    let result = await AccountModel.updateOne(
        { _id: addToUserId },
        { $push: { friend: { ...userObj, chatId: chatId } } }
    );

    return result;
}

async function repoUserByEmail(email) {
    let usr = await AccountModel.findOne({ email });
    return usr;
}

async function repoUserByName(text, maxItem = 8) {
    let usr = await AccountModel.aggregate([
        {
            $project: {
                pro: 1, // 相当于只选择某些个别 field
                firstName: 1,
                lastName: 1,
            },
        },
        {
            $addFields: {
                name: { $concat: ["$firstName", " ", "$lastName"] }, // 相当于在选择所有 field 基础上，自己加一个 customized field
            },
        },
        { $match: { name: { $regex: new RegExp(text, "i") } } },
    ]).limit(maxItem);
    // console.log("found ", usr);
    return usr;
}

async function repoFriendByName(_id, text) {
    // 寻找这个 id 的 用户，他的所有 friend 里面，谁的名字 like 这个 text

    if (text.length === 0) return [];

    let usr = await AccountModel.findOne(
        { _id: _id },
        {
            // _id: 1,
            friend: {
                $elemMatch: {
                    name: { $regex: new RegExp(text, "i") },
                },
            },
        }
    ).limit(15);
    // console.log("usr found", usr);
    return usr.friend;
}

async function repoAddUser(email, hash, salt, firstName, lastName) {
    let result = await AccountModel.insertMany([
        {
            email,
            hash,
            salt,
            firstName,
            lastName,
            pro: "",
        },
    ]);
    // console.log(result);
}

async function repoDeleteFriend(id1, id2) {
    // 从 id1 这个 user 里面，删除掉 id2 这个好友

    let r = await AccountModel.updateOne(
        { _id: id1 },
        { $pull: { friend: { _id: id2 } } }
    );
    // console.log('delete f', r);
}

module.exports = {
    repoUserByEmail,
    repoUserByName,
    repoFriendByName,
    repoAddUser,
    repoAddFriend,
    repoDeleteFriend,
};
