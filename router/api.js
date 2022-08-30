const express = require('express');
const route = express.Router();
const gError = require('./helper');
const userController = require('../Controller/userController');
const chatController = require('../Controller/chatController');

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

route.get('/getUser', gError(userController.getUser));

route.get('/getUserByName', gError(userController.getUserByName));

route.post('/addFriend', gError(userController.addFriend));

route.post('/deleteFriend', gError(userController.deleteFriend));

route.post('/getChatHistory', gError(chatController.getChatHistory));

route.post('/newMsg', gError(chatController.addChatMsg));

// route.get('/api', (req, res) => {
//     console.log('api get', req.session.email);
//     res.send('api ok');
// });

module.exports = route;
