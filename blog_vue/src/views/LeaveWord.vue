<template>
  <div>
    <div class="link_box">
      <i class="el-icon-edit icon_link"></i>
      <span class="link_text">留言板</span>
    </div>
    <p class="cut_offRule_text">留言区</p>
    <div class="leaveWord_box">
      <p class="leaveWord_box_top_text">请文明交流，遵守相关法律法规</p>
      <div class="messageList">
        <div class="infinite-list-wrapper" style="overflow: auto">
          <ul
            class="list"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled"
          >
            <li v-for="item in userNum" class="list-item" :key="item._id">
              <p class="wordIcon">
                <img :src="`/vue_img/${item.about.userIcon}`" alt="" />
              </p>
              <div class="wordIcon_right_box">
                <p class="wordIcon_right_box_name">{{ item.about.account }}</p>
                <p class="wordIcon_right_box_Date">{{ item.msgDate }}</p>
              </div>
              <p class="wordIcon_msg_box">{{ item.msgContent }}</p>
            </li>
          </ul>
          <p v-if="loading" class="inTheRecord">加载中...</p>
          <p v-if="noMore" class="inTheRecord">没有更多了</p>
        </div>
      </div>
    </div>
    <div class="chat_box">
      <i class="el-icon-chat-dot-round"></i>
      <input
        type="text"
        class="chatFrame"
        placeholder="请输入"
        @keyup.enter="sendMsg"
        ref="cursor"
        v-model="inputMsg"
      />
      <el-popover placement="top-end" width="180" trigger="click">
        <el-button slot="reference"><b>😊</b></el-button>
        <el-tabs
          v-model="activeName"
          style="cursor: pointer; user-select: none"
          @mouseup.native="handlerEmojo"
        >
          <el-tab-pane label="😀" name="first">
            <Emoji :emoji="emoji" />
          </el-tab-pane>
          <el-tab-pane label="⚽️" name="second">
            <Emoji :emoji="movement" />
          </el-tab-pane>
          <el-tab-pane label="🐶" name="third">
            <Emoji :emoji="animal" />
          </el-tab-pane>
          <el-tab-pane label="🍏" name="fourth">
            <Emoji :emoji="eat" />
          </el-tab-pane>
          <el-tab-pane label="🚗" name="fifth">
            <Emoji :emoji="traffic" />
          </el-tab-pane>
        </el-tabs>
      </el-popover>
      <button class="send_msg" @click="sendMsg">
        <i class="el-icon-position"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Emoji from "../components/MessageBase/Emoji.vue";
export default {
  name: "LeaveWord",
  components: {
    Emoji,
  },
  data() {
    return {
      visible: false,
      activeName: "first",
      inputMsg: "",
      count: 10, //默认一次性加载5条留言
      loading: false,
      userNum: [],
    };
  },
  computed: {
    ...mapState(["emoji", "movement", "animal", "eat", "traffic", "userInfo"]),
    noMore() {
      // true 没有更多  false 还有数据
      return this.count > this.userNum.length;
    },
    disabled() {
      // 能否执行滚动加载  true 不执行  false 执行
      return this.loading || this.noMore;
    },
  },
  methods: {
    //获取表情
    handlerEmojo(event) {
      let emo = event.target.innerText;
      //获取input框中光标的位置
      let cursorStart = this.$refs.cursor.selectionStart;
      //拼接
      this.inputMsg =
        this.inputMsg.substring(0, cursorStart) +
        emo +
        this.inputMsg.substring(cursorStart);
      emo = "";
      // setTimeout(()=>{
      //   this.$refs.cursor.focus()
      // },50)
    },
    //发送信息
    async sendMsg() {
      if (!this.$store.state.userInfo.account) {
        return this.$message.error("发送失败，请先登录");
      }
      if (this.inputMsg == "") {
        this.$message.error("消息不能为空");
        return;
      }
      let { data } = await this.$axios.post("/lword/sendmsg", {
        inputMsg: this.inputMsg,
        id: this.userInfo._id,
      });
      this.userNum.unshift(data);
      this.inputMsg = " ";
    },
    //滚动加载
    load() {
      this.loading = true;
      console.log("自动加载");
      setTimeout(() => {
        this.getLeaveWord(this.count);
        this.count += 10;
        this.loading = false;
      }, 2000);
    },
    //获取留言
    async getLeaveWord(val = 0) {
      let { data } = await this.$axios.post("/lword/getleaveword", {
        skip: val,
      });
      this.userNum.push(...data);
    },
  },
  created() {
    this.getLeaveWord();
  },
};
</script>

<style lang="less" scoped>
.link_box {
  width: 100%;
  height: 50px;
  background: #ebeef5;
  border-radius: 8px;
  user-select: none;

  .link_text {
    font-size: 20px;
    font-family: Microsoft JhengHei; //微软正黑体
    line-height: 50px;
    margin-left: 15px;
  }

  .icon_link {
    font-size: 24px;
    margin-left: 10px;
  }
}

.cut_offRule_text {
  width: 100%;
  height: 10px;
  line-height: 10px;
  margin-top: 30px;
  font-size: 14px;
  font-family: Microsoft JhengHei; //微软正黑体
  text-align: center;
}

.leaveWord_box {
  width: 100%;
  height: 570px;
  border: 1px solid #ebeef5;
  border-width: 2px 2px 0 2px; //设置四条边框的宽度
  border-radius: 8px 8px 0 0;
  margin-top: 10px;
  background: #f8f5fb;

  .leaveWord_box_top_text {
    width: 100%;
    height: 50px;
    background: #f5f5f5;
    text-align: center;
    line-height: 50px;
    font-family: Microsoft JhengHei;
  }

  .messageList {
    width: 96%;
    margin: 0 auto;

    .infinite-list-wrapper {
      width: 100%;
      height: 500px;

      .list-item {
        width: 100%;
        background: #fff;
        margin-top: 10px;
        border-radius: 8px;
        padding-bottom: 8px;

        .wordIcon {
          width: 50px;
          height: 50px;
          padding: 10px 0 0 18px;
          display: inline-block;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        .wordIcon_right_box {
          width: 180px;
          height: 50px;
          display: inline-block;
          vertical-align: top;
          margin: 10px 0 0 10px;
          line-height: 25px;

          .wordIcon_right_box_name {
            font-weight: 600;
          }

          .wordIcon_right_box_Date {
            font-size: 10px;
            font-weight: 300;
            color: #7c7979;
            letter-spacing: -1px;
          }
        }

        .wordIcon_msg_box {
          width: 88%;
          background: #eee;
          margin-left: 78px;
          padding: 8px;
          box-sizing: border-box;
          border-radius: 0 9px 9px 9px;
        }
      }

      .inTheRecord {
        text-align: center;
        padding: 20px 0;
      }
      //定义一整个滚动条
      &::-webkit-scrollbar {
        width: 4px;
        height: 0px;
      }

      //定义滚动条的滑块
      &::-webkit-scrollbar-thumb {
        height: 10px;
        border-radius: 10px;
        background: #409eff;
      }
    }
  }
}

.chat_box {
  width: 100%;
  height: 40px;
  background: #fff;
  display: flex;
  border: 1px solid #ebeef5;
  border-width: 0 2px 2px 2px;
  border-radius: 0 0 8px 8px;
  padding: 8px 0;

  .chatFrame {
    flex: auto;
    border-radius: 8px;
    border: none;
    background: #eee;
    padding: 4px 6px;
    outline: none;
  }

  i,
  b {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 22px;
    cursor: pointer;
  }
  .send_msg {
    width: 70px;
    height: 40px;
    background: #409eff;
    border: none;
    border-radius: 4px;
    color: #ffffff;
    font-size: 20px;
    line-height: 43px;
    line-height: 40px;
    text-align: center;
  }
  .el-button {
    padding: 0px 8px;
    border: none;
  }
  .el-button:focus,
  .el-button:hover {
    // color: #409EFF;
    // border-color: #c6e2ff;
    background-color: #fff;
  }
}
</style>
