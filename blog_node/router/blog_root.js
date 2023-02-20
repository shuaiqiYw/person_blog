const express = require("express");
const router = express.Router();
const { 
    rootinitialize, 
    rootlogin, 
    handlePass, 
    handleFlink, 
    deletelink,
    sendArticle,
    getarticleinfo,
    editairicleinfo,
    deletearticlerecord,
    handlePaging,
    changearticle
} = require("../module/user_blog/rootHandle")
const upload = require("../module/plugin_vue/multer")
const multer = require('multer')
const fs = require("fs");

//初始化root账号
router.get("/", (req, res) => {
    rootinitialize()
    res.send("初始化成功")
})

//登录
router.post("/rootlogin", async (req, res) => {
    let result = await rootlogin(req.body)
    res.send(result)
})

//修改密码
router.post("/changePass", async (req, res) => {
    let result = await handlePass(req.body);
    res.send(result);
})

//管理友链
router.post("/recommendflink", (req, res) => {
    handleFlink(req.body);
    res.send("修改成功")
})

//删除友链
router.post("/deletelink",async(req,res)=>{
    let result = await deletelink(req.body);
    res.send(result)
})

//上传文章
router.post("/articleMd", async (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return  res.send({code:0,msg:"上传错误"});
        } else if (err) {
            return  res.send({code:0,msg:"未知错误"});
        }
        let fileUrl = `/file/${req.file.filename}`;
        let path = req.file.path;
        res.send({code:1,data:{fileUrl,path},msg:"上传成功"})
    })
})

//删除未发表文章
router.post("/delarticle",async (req,res)=>{
    if(req.body.mdPath.path) return res.send(" ")
     fs.unlinkSync(req.body.mdPath)
     res.send("删除成功")
})

//发布文章
router.post("/publisharticle",async(req,res)=>{
    let result = await sendArticle(req.body);
    res.send(result)
})

//获取所有文章
router.post("/getarticleall",async(req,res)=>{
    let result = await getarticleinfo()
    res.send(result)
})

//文章管理
router.post("/editairicle",async(req,res)=>{
    let result = await editairicleinfo(req.body);
    res.send(result)
})

//删除文章记录
router.post("/deletearticle",async(req,res)=>{
    let result = await deletearticlerecord(req.body);
    res.send(result)
})

//分页
router.post("/paging",async(req,res)=>{
    let result = await handlePaging(req.body);
    res.send(result)
})

//修改文档
router.post("/changearticle",(req,res)=>{
    changearticle(req.body);
    res.send("修改成功")
})

module.exports = router