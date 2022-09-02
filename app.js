const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").Server(app);
const PORT = 5000;
const IO = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:3000", // app.use cors 对 socket.io 不起作用，需要在这里设置
    },
});

const { setSessionStore } = require("./router/redisHelper");

require("./DB/connect"); // 跑里面的 connection 代码。

const authRoute = require("./router/auth");
const apiRoute = require("./router/api");
// const Redis = require('ioredis');
// const rClient = new Redis({
//     host: 'localhost',
//     port: 6379,
// });
// rClient.set('kkk', 'vvv', (er, res) => {});

// const conn = require('./DB/connect');
// const model = require('./DB/model/account');

http.listen(PORT, () => {
    console.log(`App listen on poty = ${PORT}`);
});

// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

setSessionStore(app);

app.get("/", (req, res) => {
    console.log('"/" test here');
    res.send("server works ! haha");
});

app.use(authRoute);
app.use(apiRoute);

// rCliend.set('firk', 'wooo');
// async function nothing() {
//     await rClient.connect();
//     rClient.setEx('photo', 20, 'wooo');
// }
// nothing();

IO.on("connection", (socket) => {
    console.log("socket connected ", socket.id);
    socket.emit("confirm connection", socket.id);

    socket.on("join own room", (_id) => {
        socket.join(_id);
    });

    socket.on("join chat room", (chatId) => {
        // console.log("joined chat room here");
        socket.join(chatId);
    });

    socket.on("create group", (chatId, name, listId) => {
        // - 需要告诉所有在 listId 上的用户 chatId 和 name，让他们在前端更新出来 一行group
        // - 然后，每个用户，再 emit 给前端，加入 chatId 的 room
        for (let id of listId) {
            io.in(id).emit("create group", chatId, name);
        }
    });

    socket.on("send msg", (chatId, senderObj) => {
        // console.log("detect send", senderObj);
        IO.in(chatId).emit("receieve msg", senderObj);
    });

    socket.on("add friend", (_id, user) => {
        // 通知 id 为 _id 的用户，有一个 user obj 的用户添加你好友
        socket.to(_id).emit("add friend", user);
    });

    socket.on("delete friend", (_id1, _id2) => {
        // 通知 id1 的用户，id2 已经把你删了，你也要在前端吧 id2 从 list 里删除
        console.log("delete", _id1, _id2);

        socket.to(_id1).emit("delete friend", _id2);
    });

    // socket.on("later pong", (e) => {
    //     console.log("!!! got later pong", e);
    // });
});
