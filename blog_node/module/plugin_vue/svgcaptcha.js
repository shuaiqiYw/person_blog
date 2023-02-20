var svgCaptcha = require('svg-captcha');




module.exports = ()=>{
    let captcha = svgCaptcha.create({
        size:4, // 长度
        ignoreChars:'0o1i', // 忽略难以区分的字母
        noise:2,  //降噪线（横线）
        color:true, // 字符颜色设置了背景则为true
        background:"#ff6700", // 背景颜色
        width:100,
        height:40
    });
    // svgCaptcha.options({
    //     width:100,
    //     height:40
    // })
    return captcha
}