const AccountModel = require("../DB/model/account");

async function repoAddMessageNoti(addToUserId, msgObj) {
    // const msgObj = {
    //     chatId: ChatInfo.chatId,
    //     text: Msg.current,
    //     senderId: this_user._id,
    //     pro: this_user.pro,
    //     time: "2022-09-01",
    //     name: this_user.name,
    // };
    // console.log("msgObj", msgObj);
    let found = await AccountModel.findOne(
        { _id: addToUserId },
        {
            msgNotification: { $elemMatch: { chatId: msgObj.chatId } },
        }
    );
    let count = 1;

    // console.log("found:", found);
    // console.log("??", found.msgNotification[0].count);
    if (found.msgNotification.length !== 0) {
        count = found.msgNotification[0].count + 1;
        let pop = await AccountModel.updateOne(
            { _id: addToUserId },
            { $pull: { msgNotification: { chatId: msgObj.chatId } } }
        );
        // console.log("poped", pop);
    }

    let msgNotiObj = {
        count,
        lastMsg: msgObj.text,
        friendId: msgObj.senderId,
        pro: msgObj.pro,
        name: msgObj.name,
        chatName: msgObj.chatName,
        chatId: msgObj.chatId,
    };

    let add = await AccountModel.updateOne(
        { _id: addToUserId },
        { $push: { msgNotification: msgNotiObj } }
    );
    // console.log("push msg noti res", add);
}

async function repoAddFriendNoti(addToUserId, friendObj, requestMsg) {
    // console.log(
    //     "addToUserId, friendObj, requestMsg: ",
    //     addToUserId,
    //     friendObj,
    //     requestMsg
    // );
    // friendObj = {_id, name, pro}
    let found = await AccountModel.findOne(
        { _id: addToUserId },
        {
            friendNotification: { $elemMatch: { _id: friendObj._id } },
        }
    );
    if (found.friendNotification.length > 0) return false;

    // notification doesnt exist, create new
    let add = await AccountModel.updateOne(
        { _id: addToUserId },
        {
            $push: {
                friendNotification: {
                    friendId: friendObj._id,
                    ...friendObj,
                    requestMsg,
                },
            },
        }
    );
    return true;
}

async function repoGetMsgNotification(_id) {
    let r = await AccountModel.findOne({ _id: _id }, { msgNotification: 1 });
    return r.msgNotification;
}
async function repoGetFriendNotification(_id) {
    let r = await AccountModel.findOne({ _id: _id }, { friendNotification: 1 });
    return r.friendNotification;
}

async function repoDeleteNotification({ type, _id, chatId, friendId }) {
    if (type === "msg") {
        await AccountModel.updateOne(
            { _id },
            { $pull: { msgNotification: { chatId } } }
        );
    } else {
        // console.log("? d f", _id, friendId);
        await AccountModel.updateOne(
            { _id },
            { $pull: { friendNotification: { friendId } } }
        );
    }
}

module.exports = {
    repoAddMessageNoti,
    repoAddFriendNoti,
    repoGetMsgNotification,
    repoGetFriendNotification,
    repoDeleteNotification,
};
