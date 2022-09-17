const express = require("express");
const route = express.Router();
const gError = require("./helper");
const userController = require("../Controller/userController");
const chatController = require("../Controller/chatController");
const feedController = require("../Controller/feedController");
const notificationController = require("../Controller/notificationController");

route.use((req, res, next) => {
    let i = req.session.email;
    // console.log('api use', i);
    if (i == undefined) {
        // console.log('api denied, session not exist');
        res.status(403).send();
        return;
    }
    next();
});

route.get("/getUser", gError(userController.getUser));

route.get("/getUserByName", gError(userController.getUserByName));

route.get("/getFriendByName", gError(userController.getFriendByName));

route.get("/getNotification", gError(notificationController.getNotification));

route.post(
    "/deleteNotification",
    gError(notificationController.deleteNotification)
);

route.post(
    "/friendRequest",
    gError(notificationController.addFriendNotification)
);

route.post("/addFriend", gError(userController.addFriend));

route.post("/addNotification", gError(notificationController.addNotification));

route.post("/deleteFriend", gError(userController.deleteFriend));

route.get("/leaveGroup", gError(userController.leaveGroup));

route.post("/createGroup", gError(chatController.createGroup));

route.post("/getChatHistory", gError(chatController.getChatHistory));

route.post("/newMsg", gError(chatController.addChatMsg));

route.post("/addFeed", gError(feedController.addFeed));

route.post("/feedHistory", gError(feedController.getFeedHistory));

// route.get('/testapi', (req, res) => {
//     console.log('api get', req.session.email);
//     res.send('api ok');
// });

module.exports = route;
