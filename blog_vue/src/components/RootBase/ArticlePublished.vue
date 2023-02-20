<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="文章标题">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="文章描述">
      <el-input v-model="form.desc" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="是否置顶">
      <el-switch
        v-model="form.delivery"
        active-color="#13ce66"
        inactive-color="#ff4949"
      ></el-switch>
    </el-form-item>
    <el-form-item label="上传文章">
      <el-upload
        class="upload-demo"
        drag
        :auto-upload="false"
        ref="uploadmd"
        action="/root/articleMd"
        :limit="1"
        :on-success="handleSuccess"
        :on-change="handleChange"
        :on-remove="handleRemove"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即发布</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "ArticlePublished",
  data() {
    return {
      form: {
        name: "",
        desc: "",
        delivery: false,
      },
      mdPath:'',
    };
  },
  methods: {
    //文件上传成功时的钩子
    handleSuccess(response, file, fileList){
      this.mdPath = response.data
      console.log(this.mdPath);
    },
    //文件状态改变时的钩子  添加文件、上传成功和上传失败时都会被调用
    handleChange(file, fileList){
      if(file.name.endsWith(".md")){
        this.$refs.uploadmd.submit()
      }
    },
    //文件列表移除文件时的钩子
    async handleRemove(file, fileList){
      await this.$axios.post("/root/delarticle",{mdPath:file.response?.data?.path || file})
    },
    //发表文章
    async onSubmit() {
      if(this.form == null || this.mdPath == '') return this.$message.error("内容不能为空！")
      await this.$axios.post("/root/publisharticle",{
        form:this.form,
        mdPath:this.mdPath
      });
      this.emptyArticle()
    },
    emptyArticle(){
      this.form = {};
      this.mdPath = ""
      this.$refs.uploadmd.clearFiles()
    }
  },
  beforeDestroy(){
    if(this.mdPath){
      this.handleRemove(this.mdPath.path)
    }
    this.emptyArticle()
  }
};
</script>

<style>
</style>