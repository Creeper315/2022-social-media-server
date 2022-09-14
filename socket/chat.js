const { repoGetChatUser } = require("../Repository/chatRepo");
const { repoAddMessageNoti } = require("../Repository/notificationRepo");

function fun(IO, socket) {
    // socket.on("join chat room", (chatId) => {   // unused
    //     socket.join(chatId);
    // });

    socket.on("send msg", async (msgObj) => {
        // console.log("detect send", msgObj);
        // IO.in(chatId).emit("receieve msg", msgObj);
        let listUserId = await repoGetChatUser(msgObj.chatId);
        // console.log("send msg", listUserId, msgObj);
        // console.log("rooms:", IO.sockets.adapter.rooms);
        for (let id of listUserId) {
            // 这里，如果 friend 没有加入进 _id 的 room, 那么就保存在 notification 里面
            id = id.toString();
            let online = IO.sockets.adapter.rooms.has(id);
            // console.log(`id ${id} is online ${online}`);
            if (online) {
                IO.in(id).emit("receieve msg", msgObj);
            } else {
                repoAddMessageNoti(id, msgObj);
            }
        }
    });

    socket.on("create group", (chatId, name, listUserId) => {
        // - 需要告诉所有在 listId 上的用户 chatId 和 name，让他们在前端更新出来 一行group
        // - 然后，每个用户，再 emit 给前端，加入 chatId 的 room
        for (let id of listUserId) {
            IO.in(id).emit("create group", chatId, name);
        }
    });
}

module.exports = fun;
