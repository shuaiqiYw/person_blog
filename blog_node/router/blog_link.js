const express = require("express");
const router = express.Router();
const {handleApplyFor} = require("../module/user_blog/linksHandle")
const usersLinks = require("../module/mongoose/mongooseLink")


//设置申请友链
router.post("/applyforlink",async (req,res)=>{
    let result = await handleApplyFor(req.body,req.session.userSession.data._id);
    res.send(result)
})

//获取友链数据
router.post("/getlinksdata",async(req,res)=>{
    let result = await usersLinks.find()
    res.send(result);

})


module.exports = router