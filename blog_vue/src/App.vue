<template>
  <div id="app">
    <MaskCanvas />
    <HeaderNav />
    <div class="center_box">
      <div class="rightContent" v-show="this.$store.state.showBol">
        <IndividualSideba />
      </div>
      <div class="leftContent">
        <router-view></router-view>
      </div>
    </div>
    <el-backtop target=""></el-backtop>
    <p class="icp"><a href="https://beian.miit.gov.cn">鄂ICP备2022006387号</a></p>
    
  </div>
</template>

<script>
import HeaderNav from "./components/HeaderNav.vue";
import IndividualSideba from "./components/IndividualSideba.vue";
import MaskCanvas from "./components/MaskCanvas.vue";

export default {
  name: "App",
  components: {
    HeaderNav,
    IndividualSideba,
    MaskCanvas,
  },
};
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #000;
}
#app {
  border-top: 0.2px solid #fff;
}

.center_box {
  max-width: 1200px;
  min-width: 375px;
  margin: 65px auto 0;
  display: flex;
  

  .rightContent {
    width: 200px;
    min-height: 100vh;
    box-shadow: 0 0 5px 2px #eee;
    opacity: 0.9;
  }

  .leftContent {
    flex: auto;
    max-width: 1200px;
    min-width: 1000px;
    min-height: 100vh;
    background: #fff;
    box-shadow: 0 0 5px 2px #eee;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
    opacity: 0.9;
    z-index: 1;
  }
}

h4 {
  border-left: 5px solid #409eff;
  padding-left: 15px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #909399;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.icp{
  width: 100%;
  height: 20px;
  text-align: center;
  font-size: 12px;
}
</style>
