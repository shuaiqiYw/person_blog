//引入
const mongoose = require('mongoose');
//链接
mongoose.connect("mongodb://localhost:27017/blog").then(()=>{
    console.log("数据库链接成功");
}).catch((err)=>{
    console.log("数据库链接失败");
})

