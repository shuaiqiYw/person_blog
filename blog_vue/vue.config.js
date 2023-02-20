module.exports = {
    devServer: {
        proxy: {
            '/api' : {
                target: 'http://music.zzhitong.com',
                ws : true,
                changeOrigin:true,
                pathRewrite : {        //api替换
                    '^/api' : ''
                }
            },
            '/node' : {
                target : 'http://localhost:80',
                ws : true,
                changeOrigin:true,
                pathRewrite : {         //api替换
                    '^/node' : ''
                }
            }
        }
    }
}