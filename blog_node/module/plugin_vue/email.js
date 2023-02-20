const nodemailer = require("nodemailer");



module.exports = ({ userName, email, theme, content },callFun) => {
    //创建邮件程序
    let transporter = nodemailer.createTransport({
        //设置qq发送
        host: "smtp.qq.com",
        auth: {
            user: "1636742864@qq.com", // 发送邮件账号
            pass: "fbiudymzwjizdfae", // 邮件授权码
        },
    });

    let emailConfigurationArr = [
        //发送给写邮件的人
        {
            from: `"杨威"<1636742864@qq.com>`, // 邮件发送人名称加地址
            to: email, // 收件人邮箱
            subject: "自动回复", // 主题
            text: "你好！我是杨威，感谢来件，我已经收到您的邮件，看到后我会第一时间回复您！", // 正文
        },
        //发送给自己小号
        {
            from: '"小号"<1636742864@qq.com>', // 邮件发送人名称加地址
            to: "3189505286@qq.com", // 收件人邮箱
            subject: theme, // 主题
            text: `${userName}先生(女士)：${content}`, // 正文
        }
    ]

    //邮件发送
    emailConfigurationArr.forEach((item,index)=>{
        transporter.sendMail(item,(err,info)=>{
            if(err){
                callFun({
                    code:0,
                    msg:"邮件传送失败"
                })
            }else if(index == 1){
                callFun({
                    code:1,
                    msg:"邮件传送成功"
                })
            }
        });
    })
    
}