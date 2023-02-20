const mongoseUser = require("../mongoose/mongooseUser")
const fs = require("fs")
const path = require("path")

//处理用户
const User = async ({ account, password, flag }) => {
    let result = await mongoseUser.findOne({ account })
    if (flag == 1) { //登录
        if (!result) { //没有找到
            return { code: 0, flag: "用户信息不存在,请注册" }
        }
        if (result.password == password) {
            return { code: 1, flag: "登陆成功", data: result }
        } else {
            return { code: 0, flag: "密码错误" }
        }
    } else if (flag == 0) { //注册
        if (result) { //找到了相同的
            return { code: 0, flag: "用户信息已重复" }
        } else {
            await mongoseUser.create({ account, password });
            let registerRs = await mongoseUser.findOne({ account })
            return { code: 2, flag: "注册成功,请重新登录", data: registerRs }
        }
    }

}

//修改用戶名
const amendAccount = async ({ userName, id }) => {
    let bol = await mongoseUser.findById(id);
    if (!bol) { //沒有找到
        return {
            code: 0,
            msg: "不存在該用戶"
        }
    } else {
        await mongoseUser.updateOne({ _id: id }, { account: userName });
        bol.account = userName
        return {
            code: 1,
            msg: "修改成功",
            data: bol
        }
    }
}

//修改密码
const amendPass = async ({ newPass, id }) => {
    let bol = await mongoseUser.findById(id);
    if (!bol) { //沒有找到
        return {
            code: 0,
            msg: "不存在該用戶"
        }
    } else {
        await mongoseUser.updateOne({ _id: id }, { password: newPass });
        bol.password = newPass
        return {
            code: 1,
            msg: "修改成功",
            data: bol
        }
    }
}

//修改用户头像
const changeImg = async (id, imgPath, origin) => {
    if (origin.length > 10) {  //旧头像不是默认的，需要删除
        fs.unlink(path.resolve(__dirname, "../../public/vue_img/" + origin), () => { })
        console.log(path.resolve(__dirname, "../../public/vue_img/" + origin));
       
    }
    let newImgPath = `userImg/${imgPath}`
    await mongoseUser.updateOne({ _id: id }, { userIcon: newImgPath });
    return {
        code: 1,
        msg: "更新头像成功",
        data: await mongoseUser.findById(id)
    }
}

module.exports = {
    User,
    amendAccount,
    amendPass,
    changeImg
}