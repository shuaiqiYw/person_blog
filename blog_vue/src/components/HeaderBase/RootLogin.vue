<template>
  <div class="root_login_box">
    <transition
      name="animate__animated animate__bounce"
      enter-active-class="animate__lightSpeedInLeft"
      leave-active-class="animate__lightSpeedOutLeft"
    >
      <div class="root_box" v-if="theSecondBol">
        <p class="root_text">管理员登录</p>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="rootAccount">
            <el-input
              type="text"
              v-model="ruleForm.rootAccount"
              autocomplete="off"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="rootPass">
            <el-input
              type="password"
              v-model="ruleForm.rootPass"
              autocomplete="off"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              class="root_login_btn">登录</el-button
            >
            <el-button type="primary" @click="resetForm('ruleForm')">初始化</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "RootLogin",
  props: ["theSecondBol"],
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      }
      callback();
    };
    return {
      drawer: false,
      ruleForm: {
        rootAccount: "",
        rootPass: "",
      },
      rules: {
        rootAccount: [{ validator: checkAge, trigger: "blur" }],
        rootPass: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let { data } = await this.$axios.post("/root/rootlogin", {
            rootAccount: this.ruleForm.rootAccount,
            rootPass: this.ruleForm.rootPass,
          });
          if (!data.code) return this.$message.error(data.msg);
          this.$store.commit("CHANGEROOT", "123");
          this.$store.commit("CHANGESHOW", false);
          this.$emit("handlerRoothide");
          this.$router.push("/admin");
          this.$refs[formName].resetFields();
        } else {
          this.$message.error("不能为空,请重新输入");
          return false;
        }
      });
    },
    async resetForm(formName) {
      this.$refs[formName].resetFields();
      let {data} = await this.$axios.get("/root")
    },
  },
};
</script>

<style lang="less" scoped>
.root_login_box {
  z-index: 100 o !important;
  .root_box {
    width: 230px;
    height: 250px;
    background: #eee;
    position: fixed;
    bottom: 100px;
    left: 0;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 6px;
    z-index: 100;

    .root_text {
      text-align: center;
      font-size: 15px;
      font-weight: 300;
    }

    /deep/ .demo-ruleForm {
      width: 100%;
      margin: 20px 0 0 -28px;
    }
    .root_login_btn {
      margin-left: -56px;
    }
    
  }
  
}
</style>