//制定不同的表和表规则
const mongoose = require('mongoose');
const mongooseUser = require("./mongooseUser")
const schema = mongoose.Schema;

//用户表
module.exports = mongoose.model("leaveWord",new schema(
    //表规则
    {
        msgContent: String,
        msgDate: String,
        msgTimestamp: String,
        about:{   //关联用户
            type:schema.Types.ObjectId,
            ref:mongooseUser  //关联用户表
        }
    },
    {
        versionKey:false,
    }
))