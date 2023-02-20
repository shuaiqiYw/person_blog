<template>
  <div>
    <h4>修改资料</h4>
    <el-tabs v-model="activeName" type="card" class="adjustLocation">
      <el-tab-pane label="用户名" name="first">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-form-item label="用户名:">
            {{ userInfo.account }}
          </el-form-item>
          <el-form-item label="新用户名" prop="userName">
            <el-input
              type="text"
              v-model="ruleForm.userName"
              autocomplete="off"
              size="small "
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="修改密码" name="second">
        <el-form
          :model="ruleForm2"
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
        >
          <el-form-item label="旧密码" prop="oldPass">
            <el-input
              :type="showPass"
              v-model="ruleForm2.oldPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPass">
            <el-input
              :type="showPass"
              v-model="ruleForm2.newPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              :type="showPass"
              v-model="ruleForm2.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitPass('ruleForm2')"
              >提交</el-button
            >
            <el-button type="primary" @click="showPass = 'text'"
              >显示密码</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="更换头像" name="third">
        <el-alert title="请选择本地照片更换头像" type="warning" class="el-alert-location"> </el-alert>
        <el-upload
          class="avatar-uploader"
          action="/blog/changeimg"
          :data="{ id: this.userInfo._id }"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "amendPersonalData",
  data() {
    var validateUserName = (rule, value, callback) => {
      let accountLength = /^[\u4e00-\u9fa5_\w]{3,14}$/;
      if (!value) {
        return callback(new Error("用戶名不能为空"));
      } else if (!accountLength.test(value)) {
        return callback(new Error("请输入3-14个字符"));
      }
      callback();
    };

    var validateOldPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      } else if (value != this.userInfo.password) {
        return callback(new Error("旧密码输入错误"));
      }
      callback();
    };
    var validateNewPass = (rule, value, callback) => {
      let regular = /^[\u4e00-\u9fa5_\w]{4,12}/;
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (!regular.test(value)) {
        callback(new Error("格式错误!请重新输入"));
      } else if (value === this.userInfo.password) {
        callback(new Error("与旧密码重复，请重新输入"));
      }
      callback();
    };
    var validateCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.newPass) {
        callback(new Error("两次输入密码不一致!"));
      }
      callback();
    };

    return {
      activeName: "first",
      showPass: "password",
      imageUrl: "",
      ruleForm: {
        userName: "",
      },
      rules: {
        userName: [{ validator: validateUserName, trigger: "blur" }],
      },

      ruleForm2: {
        oldPass: "",
        newPass: "",
        checkPass: "",
      },
      rules2: {
        oldPass: [{ validator: validateOldPass, trigger: "blur" }],
        newPass: [{ validator: validateNewPass, trigger: "blur" }],
        checkPass: [{ validator: validateCheckPass, trigger: "blur" }],
      },

      ruleForm3: {},
      rules3: {},
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  methods: {
    //修改用户名
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.ruleForm.userName == this.userInfo.account)
            return this.$message.error({ message: "請輸入新的用戶名" });
          let { data } = await this.$axios.post("/blog/amendaccount", {
            userName: this.ruleForm.userName,
            id: this.userInfo._id,
          });
          if (data.code) {
            this.$message.success({ message: data.msg });
            //同步修改倉庫
            this.$store.commit("CHANGEUSERINFO", data.data);
          } else {
            this.$message.error({ message: data.msg });
          }
        } else {
          this.$message.error("请输入用户名");
          return false;
        }
      });
    },
    //修改密码
    submitPass(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let { data } = await this.$axios.post("/blog/amendpassword", {
            newPass: this.ruleForm2.checkPass,
            id: this.userInfo._id,
          });
          if (data.code) {
            this.$message.success({ message: data.msg });
            this.$refs[formName].resetFields();
            //同步修改倉庫
            this.$store.commit("CHANGEUSERINFO", data.data);
          } else {
            this.$message.error({ message: data.msg });
          }
        } else {
          this.$message.error("请输入密码");
          return false;
        }
      });
    },
    //更换头像
    handleAvatarSuccess(res, file) {
      //上传成功之后触发
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$message.success({ message: file.response.msg });
      //更新仓库
      this.$store.commit("CHANGEUSERINFO", file.response.data);
    },
    beforeAvatarUpload(file) {
      // 上传之前触发
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .adjustLocation {
  padding-top: 20px;
}

/deep/ .el-alert-location{
  margin-bottom: 10px;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  line-height: 178px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>