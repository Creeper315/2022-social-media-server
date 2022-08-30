const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/SocialMedia2022', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log(' Mongo DB Connected ! '))
    .catch((err) => console.log(err));

//
// let got = await AccountModel.find();
// let got = await AccountModel.find();

require('./model/account');
require('./model/chat');
require('./model/feed'); // 这三行可有可无。反正 call 了这 3 个 file 里的代码，我就可以看到 mongodb 就会创建这 3 个 table
