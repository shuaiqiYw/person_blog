const express = require("express");
const router = express.Router();
const email = require("../module/plugin_vue/email")
const svg = require("../module/plugin_vue/svgcaptcha")
const {User,amendAccount,amendPass,changeImg} = require("../module/user_blog/userHandle")
const upload = require("../module/plugin_vue/multer")
const  multer = require ( 'multer' ) 

//发送邮件
router.post("/sendEmail",(req,res)=>{
    let {ruleForm} = req.body;
    email(ruleForm,callFun)
    function callFun(val){
        res.send(val)
    }
})

//获取验证码
router.get("/getsvg",(req,res)=>{
    let data = svg()
    res.send(data)
})

//登录
router.post("/userhandle",async (req,res)=>{
    let {ruleForm} = req.body;
    let rs = await User(ruleForm)
    if(rs.code){
        req.session.userSession = rs;
    }
    res.send(rs)
})

//获取用户session
router.get("/getcookie",(req,res)=>{
    let data = req.session.userSession
    if(data){
        res.send(data)
    }else{
        data={
            code:0
        }
        res.send(data)
    }
})

//退出登录,清空session
router.post("/logout",(req,res)=>{
    req.session.userSession = ""
    let data = {
      account: "",
      password: "",
      registerTime: "",
      userIcon: "moren.webp",
      id: "",
    }
    res.send(data);
})

//修改用戶名
router.post("/amendaccount",async (req,res)=>{
    let result = await amendAccount(req.body)
    res.send(result)
})

//修改密码
router.post("/amendpassword",async (req,res)=>{
    let result = await amendPass(req.body)
    res.send(result)
})

//更换头像
router.post("/changeimg",(req,res)=>{
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          console.log("上传错误");
        } else if (err) {
          console.log("未知错误");
        }
        // 一切都好
        let {id} = req.body;
        let filename = req.file.filename;  //当前获取的最新头像地址
        let origin = req.session.userSession.data.userIcon;  //获取原始头像地址
        console.log(origin);
        let result = await changeImg(id,filename,origin)
        console.log(result);
        //重新设置session
        req.session.userSession = result
        res.send(result)

    })
})


module.exports = router