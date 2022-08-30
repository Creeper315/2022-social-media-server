const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const PORT = 5000;
const IO = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:3000', // app.use cors 对 socket.io 不起作用，需要在这里设置
    },
});
const { setSessionStore } = require('./router/redisHelper');

require('./DB/connect'); // 跑里面的 connection 代码。

const authRoute = require('./router/auth');
const apiRoute = require('./router/api');
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

app.get('/', (req, res) => {
    console.log('"/" test here');
    res.send('server works ! haha');
});

app.use(authRoute);
app.use(apiRoute);

// rCliend.set('firk', 'wooo');
// async function nothing() {
//     await rClient.connect();
//     rClient.setEx('photo', 20, 'wooo');
// }
// nothing();

IO.on('connection', (socket) => {
    console.log('socket connected ', socket.id);
    socket.emit('pong', 'your id ' + socket.id);

    // socket.on('ping', (e) => {
    //     console.log(e);
    //     socket.emit('pong', 'wowow');
    // });
    socket.on('join chat room', (chatId) => {
        console.log('joined chat room here');
        socket.join(chatId);
    });

    socket.on('send msg', (chatId, senderObj) => {
        console.log('detect send', senderObj);
        IO.in(chatId).emit('receieve msg', senderObj);
    });
});
