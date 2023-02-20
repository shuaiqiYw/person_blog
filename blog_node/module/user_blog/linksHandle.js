const usersLinks = require("../mongoose/mongooseLink")


//处理申请友链
const handleApplyFor = async ({ ruleForm }, id) => {
    //通过id查找，找到了修改，找不到添加
    let bol = await usersLinks.findOne({about:id});
    if (!bol) {  // 没有找到
        let result = await usersLinks.create({
            blogName: ruleForm.blogName,
            blogUrl: ruleForm.blogUrl,
            logoUrl: ruleForm.logoUrl,
            blogDescribe: ruleForm.blogDescribe,
            blogDate: Date.now() + 1000 * 60 * 60 * 8,
            about: id,
        })
    }else{      //找到了
        await usersLinks.updateOne({about:id},{
            blogName: ruleForm.blogName,
            blogUrl: ruleForm.blogUrl,
            logoUrl: ruleForm.logoUrl,
            blogDescribe: ruleForm.blogDescribe,
        })
    }
    return {
        code: bol ? 0 : 1,
        data: await usersLinks.findOne({about:id}),
        msg: bol ? '修改成功' : '添加成功'
    }
}






module.exports = {
    handleApplyFor
}