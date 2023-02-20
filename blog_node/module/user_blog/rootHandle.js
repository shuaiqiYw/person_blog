const root = require("../mongoose/mongooseRoot")
const usersLinks = require("../mongoose/mongooseLink")
const router = require("../../router/blog_root")
const mongooseArticle = require("../mongoose/mongooseArticle")
const fs = require("fs")
const path = require("path")
const { updateOne } = require("../mongoose/mongooseRoot")


//初始化
const rootinitialize = async () => {
    let bol = await root.findOne({ rootAccount: "root" })
    if (bol) return
    await root.create({
        rootAccount: "root",
        rootPassword: "123456"
    })
}

//登录
const rootlogin = async ({ rootAccount, rootPass }) => {
    let bol = await root.findOne({ rootAccount,rootPass })
    if(!bol) return {code:0,msg:"不存在该管理员账号"}
    if (bol.rootAccount !== rootAccount||bol.rootPassword !== rootPass) {
        return {
            code: 0,
            msg: "账号密码错误,请重新输入"
        }
    }
    return {
        code: 1,
        msg: "登录成功",
        data: bol
    }

}

//修改密码
const handlePass = async({newRootPass})=>{
    let oldPass =await root.findOne({rootPassword:newRootPass});
    if(oldPass){
        return {
            code:0,
            msg:"密码重复，请重新输入"
        }
    }
    await root.updateOne({rootPassword:newRootPass}) 
    return {
        code:1,
        msg:"修改成功"
    }
}

//管理友链
const handleFlink = async({recommendBol,id})=>{
    await usersLinks.updateOne({_id:id},{recommendBol:recommendBol})
}

//删除友链
const deletelink = async({id})=>{
    await usersLinks.deleteOne({_id:id})
    return {code:1,msg:"删除成功"}
}

//发表文章
const sendArticle = async({form,mdPath})=>{
    if(!fs.existsSync(mdPath.path)) return {code:0,msg:"文章不存在"}
    await mongooseArticle.create({
        articletitle:form.name,    // 标题
        articledescribe:form.desc,    // 描述
        articletop:form.delivery,     //置顶
        articleMdUrl:mdPath.fileUrl
    })
    return {code:1,msg:"发表成功"}
}

//获取所有文章信息
const getarticleinfo = async()=>{
    let once = await mongooseArticle.find({},{},{limit:10,sort:{articletime:-1}})
    let alldata = await mongooseArticle.find();
    return {
        code:1,
        once:once,
        alldata:alldata
    }
}

//修改文章信息
const editairicleinfo = async({id,articletitle,articledescribe,articletop})=>{
    await mongooseArticle.updateOne({_id:id},{
        articletitle:articletitle,
        articledescribe:articledescribe,
        articletop:articletop
    })
    return {code:1,msg:"修改成功"}
}

//删除文章记录
const deletearticlerecord = async({id})=>{
    let bol = await mongooseArticle.findById(id);
    fs.unlinkSync(path.resolve(__dirname,"../../public"+bol.articleMdUrl))
    await mongooseArticle.deleteOne({_id:id})
    return {code:1,msg:"删除成功"}
}

//分页
const handlePaging = async ({index})=>{
    return await mongooseArticle.find({},{},{limit:10,skip:index})
}

//修改文档
const changearticle = async ({value,id})=>{
    let bol = await mongooseArticle.findById(id);
    let url = path.resolve(__dirname,"../../public"+bol.articleMdUrl);
    fs.writeFile(url,value,()=>{})
}

module.exports = {
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
}