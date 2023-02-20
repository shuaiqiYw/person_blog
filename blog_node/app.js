const express = require("express");
const { param } = require("./router/blog_vue");
const app = express();

const history = require('connect-history-api-fallback');
app.use(history())
//配置静态资源
app.use(express.static("./public"));
//解析post请求数据
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//设置session
app.use(require("./module/plugin_vue/session"))
//设置子路由
app.use("/blog",require("./router/blog_vue"));
app.use("/flinks",require("./router/blog_link"))
app.use("/lword",require("./router/blog_word"))
app.use("/root",require("./router/blog_root"))
//使用数据库
require("./module/mongoose/mongoose")


app.listen("80",()=>{
    console.log("80端口启动成功");
});