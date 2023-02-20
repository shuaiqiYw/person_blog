<template>
    <div class="mask_wrap">
        <div class="center_wrap">
            <!-- logo -->
            <div class="logo_wrap">
                <img src="@/assets/logo.gif" alt="" draggable="false">
            </div>
            <!-- 选项 -->
            <ul class="nav_option">
                <li v-for="(item,index) in navOptionArr" :key="index">
                    <router-link :to="item.route">{{item.title}}</router-link>
                </li>
            </ul>
            <!-- 音乐播放器 -->
            <HeaderMusic/>
            <!-- 登录/注册 -->
            <HeaderLogin/>
            
        </div>
    </div>
</template>

<script>
import HeaderMusic from "./HeaderBase/HeaderMusic.vue"
import HeaderLogin from "./HeaderBase/HeaderLogin.vue"

export default {
    name:"HeaderNav",
    components:{
        HeaderMusic,
        HeaderLogin,
    },
    data(){
        return {
            //"首页","文章","留言","友链","关于"
            navOptionArr:[
                {
                    route:"/",
                    title:"首页"
                },
                {
                    route:"/article",
                    title:"文章"
                },
                {
                    route:"/leaveWord",
                    title:"留言"
                },
                {
                    route:"/friendshipLink",
                    title:"友链"
                },
                {
                    route:"about",
                    title:"关于"
                },
            ]
        }
    },
    methods:{
        async getSession(){
            let {data} = await this.$axios.get("/blog/getcookie")
            if(!data.code) return 
            this.$store.commit("CHANGEUSERINFO",data.data)
        }
    },
    mounted(){
        this.getSession()
    }

}
</script>

<style lang="less" scoped>
.mask_wrap{
    width: 100%;
    height: 50px;
    background: #fff;
    box-shadow: 0 0 5px 2px #eee;
    position: fixed;
    top: 0;
    z-index: 99;

    // 导航栏
    .center_wrap{
        display: flex;
        max-width: 1200px;
        min-width: 375px;
        height: 100%;
        margin: 0 auto;
        justify-content: space-between;


        // logo
        .logo_wrap{
            width: 150px;
            height: 100%;
            user-select: none;

            img{
                width: 100%;
                height: 100%;
            }
        }
        // 选项
        .nav_option{
            min-width: 680px;
            height: 100%;
            line-height: 50px;
            display: flex;
            margin-left: 20px;
            flex-grow: 1;

            li{
                padding: 0 10px;
                user-select: none;
                font-size: 14px;
                cursor: pointer;
            }
        }
    }


}
</style>