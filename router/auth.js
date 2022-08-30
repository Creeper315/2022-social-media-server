const express = require('express');
const route = express.Router();
const gError = require('./helper');
const {
    login,
    register,
    logout,
    checkLogin,
} = require('../Controller/authController');
// route.use((req, res, next) => {
//     console.log('auth rout', req.session.email);
//     next();
// });

const qwe = console.log.bind(console.log);

route.post('/login', gError(login));

// route.post('/login', async (req, res) => {
//     if (req.session.email != undefined) {
//         // user already logged in
//         req.session.email;
//         res.redirect('/main');
//         return;
//     }
// });

route.post('/register', gError(register));

// route.post('/register', async (req, res) => {
//     qwe('login dat', req.body);
//     console.log('register get', req.session.email);
//     if (!req.session.email) {
//         req.session.email = 'helllo';
//     } else res.send('ok');
// });

route.get('/logout', gError(logout));

route.get('/checkLogin', gError(checkLogin));

route.get('/test', async (req, res) => {
    addUser('', '', 'fff', 'sss');
    res.send('ok');
});

// route.post('/login', async (req, res) => {
//     qwe('login dat', req.body);
//     console.log('login get', req.session.email);
//     res.send('ok');
// });

// route.post('/register', async (req, res) => {
//     qwe('login dat', req.body);
//     console.log('register get', req.session.email);
//     if (!req.session.email) {
//         req.session.email = 'helllo';
//     }
//     res.send('ok');
// });

module.exports = route;
