<template>
    <div class="music music_vue">
        <aplayer 
            :music="music" 
            :list="musicList" 
            :float="true"
            listMaxHeight="150px"
            :listFolded="true" 
        />
    </div>
</template>

<script>
import Aplayer from 'vue-aplayer'

export default {
    name:"HeaderMusic",
    components:{
        Aplayer
    },
    data(){
        return {
            music:{
                title: '楼顶上的小斑鸠',
                artist: ' ',
                src: 'https://music.163.com/song/media/outer/url?id=1844449888.mp3',
                pic: '/vue_img/ldsdxbj.jpg'
            },
            musicList:[],
        }
    },
    methods:{
        async getMusic(){
            let cache_music = JSON.parse(sessionStorage.getItem("musicCache"));
            if(cache_music){return this.musicList = cache_music}

            let {data} = await this.$axios.get("api/playlist/detail?id=3778678");
            let num = ~~(Math.random() * 189) //~~利用符号进行的类型转换,转换成数字类型
            this.getMusicData(data.playlist.tracks.slice(num,num+10));
        },
        //获取榜单中每一条音乐的数据
        getMusicData(val){
            this.musicList = val.map((item,index) => {
                this.getMusicURL(item.id,index);
                return {
                    title: item.name,
                    artist: ' ',
                    src: '',
                    pic: item.al.picUrl,
                    id: item.id
                }
            })   
        },
        //请求每条音乐的数据
        async getMusicURL(val,index){
            let {data} = await this.$axios.get("api/song/url?id="+val);
            this.musicList[index].src = data.data[0].url;
            this.setSessionStorage()
        },
        //存储音乐数据
        setSessionStorage(){
            sessionStorage.setItem("musicCache",JSON.stringify(this.musicList));
        }
    },
    mounted(){
        this.getMusic();
    }
}
</script>

<style lang="less" scoped>
 .music_vue{
        width: 200px;
        /deep/ .aplayer-pic{
            width: 40px;
            height: 40px;
            border-radius: 50% ;
            margin-top: 5px;
        }
        /deep/ .aplayer-body{
            height: 50px;
            box-shadow: 0 0 5px 1px #eee;
        }
        /deep/ .aplayer-float{
            margin: 0;
            box-shadow: 0 0 0 0 #eee;
        }
        /deep/ .aplayer-body .aplayer-info{
            padding: 0;
            height: 50px;
            margin-left: 5px;
        }
        /deep/ .aplayer-info .aplayer-body .aplayer-info{
            border:none;
        }
        /deep/  .aplayer.aplayer-withlist .aplayer-body .aplayer-info{
            border:none;
        }
        /deep/ .aplayer-music {
            margin-top: 10px;
        }
        /deep/ .aplayer-controller{
            margin-left: 5px;
        }

        /deep/ .aplayer-info .aplayer-volume-bar{
            height: 25px;
            box-shadow: 0 0 0 0 #eee;
        }
        /deep/  .aplayer-withlist{
            margin: 0;
        }
        /deep/ .aplayer-controller{
            width: 100px;
        }
        /deep/ .aplayer-pic .aplayer-play {
            width: 15px;
            height: 15px;
            bottom: 30%;
            right: -290%;
            border: 0px solid #fff;
        }
        /deep/ .aplayer-pic .aplayer-play .aplayer-icon-play{
            top: -2px;
            left: -1px;
            border: 0px solid #eee;
        }
        /deep/ .aplayer-pic .aplayer-pause{
            width: 15px;
            height: 15px;
            bottom: -7%;
            right: -328%;
            border: 0px solid #fff;
        }
        /deep/ .aplayer-icon-menu{
            margin-top: 2px;
        }  
    }

    .music_vue /deep/ .aplayer-icon-mode,
    .music_vue /deep/ .aplayer-time-inner{
        display: none;
    }
</style>