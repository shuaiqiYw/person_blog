<template>
  <div class="admin_box">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="修改密码" name="first">
        <p style="margin-left: 12px">新密码:</p>
        <el-input
          placeholder="请输入"
          class="root_new_pass"
          v-model="newRootPass"
        ></el-input>
        <el-button
          type="primary"
          style="margin-left: 10px"
          @click="handleRootPass"
          >提交</el-button
        >
      </el-tab-pane>
      <el-tab-pane label="友链管理" name="second">
        <LinkManagement />
      </el-tab-pane>
      <el-tab-pane label="发表文章" name="third">
        <ArticlePublished />
      </el-tab-pane>
      <el-tab-pane label="文章管理" name="fourth">
        <ArticleManagement />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import LinkManagement from "../components/RootBase/LinkManagement.vue";
import ArticleManagement from "../components/RootBase/ArticleManagement.vue";
import ArticlePublished from "../components/RootBase/ArticlePublished.vue";
export default {
  name: "Admin",
  components: {
    LinkManagement,
    ArticleManagement,
    ArticlePublished,
  },
  data() {
    return {
      activeName: "first",
      newRootPass: "",
    };
  },
  methods: {
    handleClick() {},
    async handleRootPass() {
      let { data } = await this.$axios.post("/root/changePass", {
        newRootPass: this.newRootPass,
      });
      if (data.code) {
        this.$message.success(data.msg);
      } else {
        this.$message.error(data.msg);
      }
    },
  },
  created() {
    this.$store.commit("CHANGESHOW", false);
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("CHANGESHOW", true);
    next();
  },
};
</script>

<style lang="less" scoped>
.admin_box{
  max-width: 1200px;

  .root_new_pass {
  margin: 20px 10px;
}
}

</style>