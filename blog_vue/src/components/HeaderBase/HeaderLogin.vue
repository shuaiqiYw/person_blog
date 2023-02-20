<template>
  <div class="login_register">
    <div class="box" @click="loginConceal">
      <i class="el-icon-user"></i>
    </div>
    <div class="form_login" v-if="flag">
      <div v-if="!userInfo.account">
        <el-form
          :model="ruleForm"
          :rules="rules"
          label-width="80px"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="account">
            <el-input
              type="text"
              v-model="ruleForm.account"
              autocomplete="off"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="text"
              v-model="ruleForm.password"
              autocomplete="off"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" class="svg_box" prop="svgCode">
            <el-input v-model="ruleForm.svgCode" size="mini"></el-input>
            <div ref="svg" @click="getSVG" class="svg_style"></div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm', 1)" class="login_btn">登录</el-button>
            <el-button type="primary" @click="submitForm('ruleForm', 0)" class="register_btn">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-else>
        <div class="loginAfter">
          <p class="headPortrait">
            <img :src="`/vue_img/${userInfo.userIcon}`" alt="头像" draggable="false">
          </p>
          <div class="loginInfo">
            <p class="nickname">用戶名：{{userInfo.account}}</p>
            <p class="registrationDate">注册时间：{{userInfo.registerTime.split("-")[0]+"年"+userInfo.registerTime.split("-")[1]+"月"}}</p>
          </div>
        </div>
        <div>
          <router-link to="/amendPersonalData">
            <el-button type="primary" size="mini" class="amend_exit">修改资料</el-button>
          </router-link>
        </div>
        <div>
          <el-button type="primary" size="mini" class="amend_exit" @click="logOut">退出登录</el-button>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderLogin",
  data() {
    let validateAccount = (rule, value, callback) => {
      let accountLength = /^[\u4e00-\u9fa5_\w]{3,14}$/;
      if (!value) {
        return callback(new Error("账号不能为空"));
      }else if(!accountLength.test(value)){
        return callback(new Error("请输入3-14个字符"));
      }
      callback();
    };
    let validatePassword = (rule, value, callback) => {
      let regular = /^[\u4e00-\u9fa5_\w]{3,14}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      }else if(!regular.test(value)){
        callback(new Error("格式错误!请重新输入"));
      }
      callback()
    };
    let validateSvg = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("验证码不能为空"));
      } else if (value !== this.svgText) {
        callback(new Error("验证码错误"));
      }
      callback();
    };
    return {
      flag: false,
      svgText: "",
      ruleForm: {
        account: "",
        password: "",
        flag: "",
        svgCode: "",
      },
      rules: {
        account: [{ validator: validateAccount, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        svgCode: [{ validator: validateSvg, trigger: "blur" }],
      },
    };
  },
  computed:{
    userInfo(){
      return this.$store.state.userInfo
    }
  },
  methods: {
    //隐藏显示
    loginConceal() {
      this.flag = !this.flag;
      if (this.flag) {
        this.getSVG();
      }
    },
    //提交（登录）
    submitForm(formName, num) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.ruleForm.flag = num;
          let { data } = await this.$axios.post("/blog/userhandle", {ruleForm: this.ruleForm});
          if (data.code == 1) { //登录成功
            this.$message.success({message: data.flag});
            //重置
            this.$refs[formName].resetFields();
            //将数据存到仓库（Vuex）中
            this.$store.commit("CHANGEUSERINFO",data.data)
            if(this.$store.state.userInfo.userIcon) this.afterBol = false
          }else if(data.code == 2){ //注冊
            this.$message.success({message: data.flag});
            //重置
            this.$refs[formName].resetFields();
            this.getSVG()
          }else {
            this.$message.error({message: data.flag});
          }
        } else {
          this.$message({
            message: "请先完成信息填写",
            type: "error",
            duration: 2000,
          });
        }

      });
    },
    //退出登录
    async logOut(){
      let {data} = await this.$axios.post("/blog/logout")
      this.$store.commit("CHANGEUSERINFO",data)
      this.getSVG()
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //获取验证码
    async getSVG() {
      //节流
      if(!this.flag) return;
      if(this.userInfo.account) return;
      let { data } = await this.$axios.get("/blog/getsvg");
      this.svgText = data.text;
      console.log(data.text);
      this.$refs.svg.innerHTML = data.data;
    }
    
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 50px;
  height: 50px;
}
.login_register {
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
  position: relative;

  &:hover {
    background: #eee;
  }
}

.form_login {
  width: 300px;
  height: 210px;
  position: absolute;
  right: 0px;
  top: 51px;
  box-shadow: 0 0 3px 1px #ddd;
  padding: 10px;
  background: #fff;

  .svg_box {
    width: 180px;
    position: relative;

    .svg_style {
      position: absolute;
      top: 0;
      left: 120px;
    }
  }

  .loginAfter{
    width: 300px;
    height: 100px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;

    .headPortrait{
      width: 80px;
      height: 80px;
      flex: 1;
      padding-right: 20px;

      img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }

    .loginInfo{
      flex: 2;

      p{
        height: 40px;
        text-align: left;
        font-size: 14px;
        font-weight: 400;
      }
    }
  }

  /deep/ .amend_exit{
    width: 100%;
  }

  /deep/ .login_btn{
    width: 100px;
    margin-left: -50px;
    margin-top: 5px;
  }

  /deep/ .register_btn{
    width: 100px;
    margin-left: 50px;
    margin-top: 5px;
  }

  /deep/ .el-form-item{
    margin-left: -15px;
    margin-bottom: 12px;
  }
}
</style>