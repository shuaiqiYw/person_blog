<template>
  <mavonEditor 
    v-model="value" 
    :editable="false"
    :toolbarsFlag="false"
    :subfield="false"
    defaultOpen="preview"
  />
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "ArticleManagement",
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
  },
  created() {
    this.getmd(this.$route.query.info);
  },
};
</script>

<style lang="less" scoped>
</style>