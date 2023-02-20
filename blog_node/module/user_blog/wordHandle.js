const mongooseWord = require("../mongoose/mongooseWord")


//发送留言
const sendmsg = async ({inputMsg,id})=>{
    let bol = await mongooseWord.create({
        msgContent:inputMsg,
        msgDate:new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString('chinese',{hour12:false}),
        msgTimestamp: Date.now(),
        about:id 
    })
    return mongooseWord.findById(bol._id).populate("about",{password:0}) //查询带有populate,查询出的数据，引用的文档会全部打出
}

//获取留言
const getleaveword = async ({skip})=>{
    return await mongooseWord.find({},{},{skip,limit:10,sort:{msgTimestamp:-1}}).populate("about",{password:0})
}




module.exports ={
    sendmsg,
    getleaveword
}