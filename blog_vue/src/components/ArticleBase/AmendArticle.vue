<template>
  <div class="mavonEditor">
    <mavonEditor
      v-model="value"
      @save="updateDocument"
    />
    <div class="icon_post" @click="$router.back()">
        <i class="el-icon-right"></i>
    </div>
    
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "AmendArticle",
  components: {
    mavonEditor,
  },
  data() {
    return {
      value: "",
    };
  },
  methods: {
    async getmd(val) {
      let { data } = await this.$axios.get(val);
      this.value = data;
    },
    //修改文档
    async updateDocument(value){
        await this.$axios.post("/root/changearticle",{value,id:this.$route.query.id});
    }
  },
  created() {
    this.$store.commit("CHANGESHOW", false);
    this.getmd(this.$route.query.info);
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("CHANGESHOW", true);
    next();
  },
};
</script>

<style lang="less" scoped>
.icon_post{
    position: absolute;
    left: 1190px;
    top: 10px;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 30px;
    background: #eee;
    border-radius: 5px;
    cursor: pointer;
}


</style>