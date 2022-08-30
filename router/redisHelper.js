var session = require('express-session');
var redisStore = require('connect-redis')(session);

const Redis = require('ioredis');
let redisClient = new Redis();
const expireSecond = 99999;

// https://www.npmjs.com/package/connect-redis
// 正确的 session store 方法

function setSessionStore(app) {
    app.use(
        session({
            store: new redisStore({
                client: redisClient,
                ttl: expireSecond,
            }),
            saveUninitialized: false,
            secret: 'sunnyday',
            resave: false,
        })
    );
}

module.exports = { setSessionStore };

// function setSessionStore(app) {
//     app.use(
//         // await Redis.connect();

//         session({
//             secret: 'sunnyday',
//             store: new redisStore({
//                 host: RedisHOST,
//                 port: RedisPORT,
//                 client: Redis,
//                 ttl: expireSecond,
//             }),
//             saveUninitialized: false,
//             resave: false,
//         })
//         // next();
//     );
//     console.log('session mid set...');
// }
