//制定不同的表和表规则
const mongoose = require('mongoose');

//用户表
module.exports = mongoose.model("article",new mongoose.Schema(
    //表规则
    {
        articletitle:String,    // 标题
        articledescribe:String,    // 描述
        articleMdUrl: String,      //文章地址
        articletop:{                //置顶
            type:Boolean,
            default:false
        },
        articleamend:{                //能否修改
            type:Boolean,
            default:true
        },
        articletime:{
            type:Date,
            default:Date.now() + 1000 * 60 * 60 * 8  //时间戳->北京时间
        }  
        
    },
    {
        versionKey:false,
    }
))