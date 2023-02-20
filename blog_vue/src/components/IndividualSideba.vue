<template>
  <div>
    <div class="sidebar">
      <div class="headPortrait">
        <img
          class="headPortrait_img"
          src="@/assets/comImg/touxiang.jpg"
          alt=""
        />
      </div>
      <div class="introduce" @click="verdictTime">初出茅庐的CV工程师</div>
      <div class="concealStyle_box">
        <transition
          name="animate__animated animate__bounce"
          enter-active-class="animate__bounceInLeft"
          leave-active-class="animate__bounceOutRight"
        >
          <div class="concealStyle" v-if="bol">{{ concealText }}</div>
        </transition>
      </div>

      <!-- 文章 -->
      <div class="article_box">
        <h4>热门文章</h4>
        <ul>
          <li
            v-for="(item, index) in article_Arr"
            :key="index"
            class="article_list"
          >
            <div class="picture_box">
              <img :src="item.imgSrc" alt="" draggable="false" />
            </div>
            <!-- <span class="acticile">{{ item.acticle_abstract }}</span> -->
            <router-link :to="item.route" class="acticile">{{ item.acticle_abstract }}</router-link>
          </li>
        </ul>
      </div>
      <!-- 博客信息 -->
      <div class="blog_message_box">
        <h4>博客信息</h4>
        <ul>
          <li
            v-for="(item, index) in blog_Info_Arr"
            :key="index"
            class="blog_message_list"
          >
            <i :class="item.icon_Class"></i>
            <router-link :to="item.route" class="titleText_box">{{ item.titleText }}</router-link>
            <span class="number_box">{{ item.number }}</span>
          </li>
        </ul>
      </div>
      <!-- 管理员登录 -->
      <div class="root_login_box">
        <h4>管理员</h4>
        <ul>
          <li>
            <i class="el-icon-setting"></i>
            <span @click="theSecondBol=!theSecondBol">登录</span>
          </li>
        </ul>
      </div>
    </div>
    <RootLogin :theSecondBol="theSecondBol" @handlerRoothide="handlerRoothide"/>
  </div>
</template>

<script>
import RootLogin from "../components/HeaderBase/RootLogin.vue";

export default {
  name: "IndividualSideba",
  components: {
    RootLogin,
  },
  data() {
    return {
      total:0,
      bol: false,
      theSecondBol: false,
      concealTextArr: [
        "早上好！打工人！",
        "中午好！干饭人！",
        "下午好！苦命人！",
        "晚上好！网易人！",
      ],
      concealText: ["早上好！打工人！"],
      article_Arr: [
        {
          imgSrc: require("../assets/comImg/hot1.jpg"),
          acticle_abstract: "Node内置模块",
          route:"/article/lookOver?info=%2Ffile%2F1649418632352-Node%20内置模块.md&id=625021894da2362852ffecda"
        },
        {
          imgSrc: require("../assets/comImg/hot2.jpg"),
          acticle_abstract: "axios-内置模块-path",
          route:"/article/lookOver?info=%2Ffile%2F1649418667475-axios-内置模块path.md&id=625021ac4da2362852ffecdc"
        },
        {
          imgSrc: require("../assets/comImg/hot3.jpg"),
          acticle_abstract: "变量、作用域",
          route:"/article/lookOver?info=%2Ffile%2F1649411597094-变量，作用域.md&id=6250060dbfc25dec4dd786ae"
        },
        {
          imgSrc: require("../assets/comImg/hot4.jpg"),
          acticle_abstract: "事件",
          route:"/article/lookOver?info=%2Ffile%2F1649411553278-事件.md&id=625005e2bfc25dec4dd786ac"
        },
        {
          imgSrc: require("../assets/comImg/hot5.jpg"),
          acticle_abstract: "数组和字符串常用的方法",
          route:"/article/lookOver?info=%2Ffile%2F1649411473969-数组和字符串常用方法.md&id=62500597bfc25dec4dd786a6"
        },
      ],
      blog_Info_Arr: [
        {
          icon_Class: "el-icon-document",
          titleText: "文章",
          number: 6,
          route:"/article"
        },
        {
          icon_Class: "el-icon-chat-dot-round",
          titleText: "评论数量",
          number: 8,
          route:"/leaveWord"
        },
        {
          icon_Class: "el-icon-sunny",
          titleText: "运行天数",
          number: "100",
          route:"/"
        },
        {
          icon_Class: "el-icon-connection",
          titleText: "活动",
          number: "1",
          route:"/"
        },
      ],
    };
  },
  methods: {
    async getArticleTotal(){
      let {data} = await this.$axios.post("/root/getarticleall");
      this.total = data.alldata.length
      this.$store.commit("CHANGEARTICLENUM",this.total);

    },
    //判断时间来改变文字
    verdictTime() {
      this.bol = !this.bol;
      let data = new Date().toTimeString().split(":")[0];
      switch (true) {
        case data >= 0 && data <= 12:
          this.concealText = this.concealTextArr[0];
          break;
        case data > 12 && data <= 14:
          this.concealText = this.concealTextArr[1];
          break;
        case data > 14 && data <= 18:
          this.concealText = this.concealTextArr[2];
          break;
        case data > 18 && data <= 24:
          this.concealText = this.concealTextArr[3];
          break;
      }
      setTimeout(() => {
        this.bol = !this.bol;
      }, 1500);
    },
    handlerRoothide(){
      this.theSecondBol = false
    }
  },
  created(){
    this.getArticleTotal();
  }
};
</script>

<style lang="less" scoped>
.sidebar {
  width: 200px;
  height: 100%;
  padding-top: 10px;
  background: #fff;

  .headPortrait {
    width: 100px;
    height: 100px;
    margin: 0 auto;

    .headPortrait_img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  .introduce {
    width: 160px;
    font-size: 14px;
    font-weight: 600;
    // text-align: center;
    position: relative;
    margin: 0 auto;
    padding-top: 5px;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &::after {
      content: "";
      position: absolute;
      bottom: 2px;
      right: 10px;
      width: 0px;
      height: 0px;
      border: 6px solid black;
      border-color: transparent transparent transparent rgba(0, 0, 0, 0.5);
    }
  }
  .concealStyle_box {
    position: relative;

    .concealStyle {
      width: 110px;
      height: 30px;
      border-radius: 10px;
      background: rgba(112, 125, 245, 0.3);
      font-size: 12px;
      text-align: center;
      line-height: 30px;
      position: absolute;
      left: 45px;
      top: 3px;
    }
  }

  .article_box {
    margin-top: 40px;

    h4 {
      margin-left: 10px;
      margin-bottom: 10px;
    }

    ul {
      width: 100%;
      height: 300px;

      .article_list {
        width: 180px;
        height: 60px;
        font-size: 14px;
        margin: 0 auto;
      }

      .picture_box {
        width: 50px;
        height: 50px;
        display: inline-block;
        float: left;

        img {
          width: 100%;
          height: 100%;
          border-radius: 6px;
        }
      }

      .acticile {
        width: 120px;
        height: 50px;
        padding-left: 10px;
        font-size: 12px;
        float: left;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        //转化成谷歌
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
  }

  .blog_message_box {
    margin-top: 5px;

    h4 {
      margin-left: 10px;
    }

    ul {
      width: 100%;
      height: 130px;

      .blog_message_list {
        width: 180px;
        height: 30px;
        margin: 0 auto;
        line-height: 30px;
        position: relative;
        cursor: pointer;

        i {
          font-size: 24px;
          padding-right: 10px;
          padding-top: 10px;
        }

        .titleText_box {
          font-size: 14px;
          position: absolute;
          top: 7px;
        }

        .number_box {
          position: absolute;
          right: 20px;
          top: 7px;
        }
      }
    }
  }

  .root_login_box {
    margin-top: 5px;

    h4 {
      margin-left: 10px;
    }

    ul {
      width: 100%;
      height: 50px;

      li {
        width: 180px;
        height: 30px;
        margin: 0 auto;
        line-height: 30px;
        position: relative;
        cursor: pointer;

        i {
          font-size: 24px;
          padding-right: 10px;
          padding-top: 10px;
        }

        span {
          font-size: 14px;
          position: absolute;
          top: 6px;
          user-select: none;

          &:hover{
            color: #409EFF;
          }
        }
      }
    }
  }
}

</style>