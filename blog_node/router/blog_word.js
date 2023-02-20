const express = require("express");
const router = express.Router();
const {sendmsg,getleaveword} = require("../module/user_blog/wordHandle")


router.post("/sendmsg",async (req,res)=>{
    let result = await sendmsg(req.body);
    res.send(result)
})

router.post("/getleaveword",async (req,res)=>{
    let count = req.body;
    let result = await getleaveword(count)
    res.send(result)
})


module.exports = router