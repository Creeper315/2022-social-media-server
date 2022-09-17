const bcrypt = require("bcrypt");
const AccountModel = require("../DB/model/account");
const { repoUserByEmail, repoAddUser } = require("../Repository/userRepo");
// let acc = new AccountModel({
//     email: 'a@gmail.com',
//     password: 'psss222',
// });

// acc.save()
//     .then((e) => {
//         console.log('saved', e);
//     })
//     .catch((e) => console.log('err', e));

async function login(req, res) {
    if (req.session.email) {
        console.log("user already logged in", req.session.email);
        // res.send(req.session.email); // 已经登录了
        // return;
    }
    let { email, password } = req.body;
    let exist = await repoUserByEmail(email);
    if (exist == null) {
        res.status(400).send("User does not exist");
        return;
    }

    let toVerify = await reHashPassword(password, exist.salt);
    // console.log(toVerify, exist.hash);
    if (toVerify != exist.hash) {
        res.status(400).send("Password incorrect -");
        return;
    }
    req.session.email = email;
    res.send(email);
}

async function hashPassword(password) {
    let salt = await bcrypt.genSalt();
    let hash = await bcrypt.hash(password, salt);
    return [hash, salt];
}

async function reHashPassword(password, salt) {
    if (salt == undefined) {
        throw "Need to provide salt!";
    }
    let hash = await bcrypt.hash(password, salt);
    return hash;
}

async function register(req, res) {
    let { email, password, firstName, lastName, pro } = req.body;
    // console.log("regi what is ", email, password, firstName, lastName, pro);
    let exist = await repoUserByEmail(email);
    if (exist != null) {
        res.status(400).send("Email already registered");
        return;
    }
    let [hash, salt] = await hashPassword(password);
    await repoAddUser(email, hash, salt, firstName, lastName, pro);
    req.session.email = email;
    res.send(email);
}

async function logout(req, res) {
    try {
        if (req.session) {
            req.session.destroy();
        }
    } catch (error) {
        res.status(500).json(error);
        return;
    }
    res.send("success");
}

async function checkLogin(req, res) {
    if (req.session.email) {
        res.send(req.session.email);
        return;
    }
    res.send(false);
}

module.exports = { login, register, logout, checkLogin };
