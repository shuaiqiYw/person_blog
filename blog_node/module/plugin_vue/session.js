const session = require('express-session');
const MongoStore = require('connect-mongo');

module.exports = session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,  //true就是只允许https协议使用
        maxAge: 1000 * 60 * 60 * 24 * 7  //设置过期时间
    },
    store: MongoStore.create({
        mongoUrl: "mongodb://localhost:27017/blog"
    })
  })