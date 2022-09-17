function fun(IO, socket) {
    socket.on("join own room", (_id) => {
        socket.join(_id);
    });

    socket.on("add friend", (_id, user) => {
        // 通知 id 为 _id 的用户，有一个 user obj 的用户添加你好友
        socket.to(_id).emit("add friend", user);
    });

    socket.on("delete friend", (_id1, _id2) => {
        // 通知 id1 的用户，id2 已经把你删了，你也要在前端吧 id2 从 list 里删除
        // console.log("delete", _id1, _id2);

        socket.to(_id1).emit("delete friend", _id2);
    });
    socket.on("friend request", (_id) => {
        // _id 是 user id
        socket.to(_id).emit("friend request");
    });
}

module.exports = fun;
