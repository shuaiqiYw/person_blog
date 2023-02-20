//制定不同的表和表规则
const mongoose = require('mongoose');
const mongooseUser = require("./mongooseUser")
const schema = mongoose.Schema;

//用户表
module.exports = mongoose.model("usersLinks",new schema(
    //表规则
    {
        blogName: String,
        blogUrl: String,
        logoUrl: String,
        blogDescribe: String,
        blogDate:Date,
        about:{   //关联用户
            type:schema.Types.ObjectId,
            ref:mongooseUser  //关联用户表
        },
        recommendBol: {     //是否推荐友链
            type: Boolean,
            default: false
        }   
    },
    {
        versionKey:false,
    }
))