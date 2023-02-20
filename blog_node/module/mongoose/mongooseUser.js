//制定不同的表和表规则
const mongoose = require('mongoose');

//用户表
module.exports = mongoose.model("users",new mongoose.Schema(
    //表规则
    {
        account:String,
        password:String,
        //注册时间
        registerTime:{
            type:Date,
            default:Date.now() + 1000 * 60 * 60 * 8  //时间戳->北京时间
        },
        userIcon:{
            type:String,
            default:"moren.webp"
        }
    },
    {
        versionKey:false,
    }
))