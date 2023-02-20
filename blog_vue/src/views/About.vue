<template>
  <div class="about">
    <div class="about_bg"></div>
    <!-- 自述 -->
    <div class="readme_box">
      <h4>自述</h4>
      <p class="readme">我是图图小淘气，爱吃萝卜爱放屁</p>
    </div>
    <!-- 技能 -->
    <div class="skill_box">
      <h4>技能</h4>
      <ul class="skill_list">
        <li v-for="(item, index) in skillArr" :key="index" class="skill">
          {{ item.skillName }}
        </li>
      </ul>
    </div>
    <!-- 联系我 -->
    <div class="relation_box">
      <h4>联系我</h4>
      <p class="relation_text">
        有任何需求或招聘请联系我，收到消息之后会回复你
      </p>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="贵姓" prop="userName">
          <el-input
            type="text"
            v-model.trim="ruleForm.userName"
            autocomplete="off"
            placeholder="请输入名字"
          ></el-input>
        </el-form-item>
        <el-form-item label="你的邮箱地址" prop="email">
          <el-input
            type="text"
            v-model.trim="ruleForm.email"
            autocomplete="off"
            placeholder="只支持QQ邮箱,请输入邮箱地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱主题" prop="theme">
          <el-input
            type="text"
            v-model.trim="ruleForm.theme"
            placeholder="请输入主题"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input
            type="text"
            v-model.trim="ruleForm.content"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    var validateUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("贵姓不能为空"));
      }
      callback();
    };
    var validateEmail = (rule, value, callback) => {
      let regular = /[0-9]+@[a-z]+[a-z].+/;
      if (!value) {
        return callback(new Error("邮箱地址不能为空"));
      } else if (!regular.test(value)) {
        return callback(new Error("邮箱地址格式错误"));
      }
      callback();
    };
    var validateTheme = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("主题不能为空"));
      }
      callback();
    };
    var validateContent = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("内容不能为空"));
      }
      callback();
    };

    return {
      skillArr: [
        {
          skillName: "HTML/CSS",
        },
        {
          skillName: "JavaScript",
        },
        {
          skillName: "jQuery",
        },
        {
          skillName: "Node-Express",
        },
        {
          skillName: "Vue2.0-Vue3.0",
        },
        {
          skillName: "react",
        },
        {
          skillName: "微信小程序",
        },
        {
          skillName: "ElementUI",
        },
      ],
      ruleForm: {
        userName: "",
        email: "",
        theme: "",
        content: "",
      },
      rules: {
        //表单验证规则
        userName: [{ validator: validateUserName, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        theme: [{ validator: validateTheme, trigger: "blur" }],
        content: [{ validator: validateContent, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //按规则填完数据
          //Ajax请求
          let { data } = await this.$axios.post("node/blog/sendEmail", {ruleForm: this.ruleForm});
          if (data.code == 1) {
            this.$message({
              message: data.msg,
              type: "success",
              duration: 2000,
            });
          }else if(data.code == 0){
            this.$message({
              message: data.msg,
              type: "fail",
              duration: 2000,
            });
          }
          this.$refs[formName].resetFields();
          console.log(data);
        } else {
          //没按规则填完数据或者有空
          this.$message({
            message: "发送邮件失败",
            type: "error",
            duration: 2000,
          });
        }
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.about {
  .about_bg {
    width: 100%;
    height: 300px;
    background: url("http://yangkk.cn/vue_img/about_bg.jpg") no-repeat center/cover;
    border-radius: 10px;
  }

  .readme_box {
    padding-top: 15px;

    .readme {
      font-size: 14px;
      padding: 5px 1px;
    }
  }

  .skill_box {
    padding-top: 15px;

    .skill_list {
      .skill {
        font-size: 15px;
        font-weight: 600;
        position: relative;
        padding: 1px 30px;

        &::before {
          content: "";
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #000;
          position: absolute;
          left: 0;
          top: 6px;
        }
      }
    }
  }

  .relation_box {
    padding-top: 15px;

    .relation_text {
      font-size: 14px;
      padding: 5px 0 10px 0;
    }
  }
}
</style>
