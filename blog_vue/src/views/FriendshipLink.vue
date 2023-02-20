<template>
  <div>
    <div class="link_box">
      <i class="el-icon-link icon_link"></i>
      <span class="link_text">友情链接</span>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="申请友链" name="first">
        <p class="applyFor_text">欢迎申请友链，请规范书写  😀</p>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-form-item label="博客名称" prop="blogName">
            <el-input
              type="text"
              v-model="ruleForm.blogName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="博客地址" prop="blogUrl">
            <el-input
              type="text"
              v-model="ruleForm.blogUrl"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="logo地址" prop="logoUrl">
            <el-input v-model="ruleForm.logoUrl"></el-input>
          </el-form-item>
          <el-form-item label="博客描述" prop="blogDescribe">
            <el-input v-model="ruleForm.blogDescribe"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >申请</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="友链展示" name="second">
        <LinksChild :linkArr="linkArr"/>
      </el-tab-pane>
      <el-tab-pane label="推荐友链" name="third">
        <LinksChild :linkArr="linkHot"/>
      </el-tab-pane>
      <el-tab-pane label="个人友链" name="fourth">
        <LinksChild :linkArr="linkPerson"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import LinksChild from "../components/LinksBase/LinksChild.vue"
export default {
  components:{
    LinksChild
  },
  name: "FriendshipLink",
  data() {
    let validateBlogName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空,请输入"));
      }
      callback()
    };
    let validateBlogUrl = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("不能为空,请输入"));
      }else if(!(value.startsWith("http")||value.startsWith("https"))){
        callback(new Error("格式不正确,请重新输入"));
      }
      callback();
    };
    return {
      linkArr: [],
      linkHot:[],
      linkPerson:[],
      activeName: "first",
      ruleForm: {
        blogName: "",
        blogUrl: "",
        logoUrl: "",
        blogDescribe: "",
      },
      rules: {
        blogName: [{ validator: validateBlogName, trigger: "blur" }],
        blogUrl: [{ validator: validateBlogUrl, trigger: "blur" }],
        logoUrl: [{ validator: validateBlogUrl, trigger: "blur" }],
        blogDescribe: [{ validator: validateBlogName, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if(!this.$store.state.userInfo.account){
            return this.$message.error("申请失败，请先登录")
          }
          let {data} = await this.$axios.post("/flinks/applyforlink",{ruleForm:this.ruleForm})
          this.$refs[formName].resetFields();
          this.$message.success(data.msg);
          this.linkArr.unshift(data.data);
        } else {
          this.$message.error("请重新输入")
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //获取所有友链数据
    async getLinks(){
      let {data} = await this.$axios.post("/flinks/getlinksdata");
      this.linkArr = data
      this.linkHot = data.filter((item)=>item.recommendBol)
      data.forEach((item)=>{
        if(item.about == this.$store.state.userInfo._id){
           this.linkPerson = [item]
        }
      })
    }
  },
  mounted(){
    this.getLinks()
  }
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

.applyFor_text{
  text-align: center;
  font-family: Microsoft JhengHei; //微软正黑体
  padding: 10px 0;
}


</style>
