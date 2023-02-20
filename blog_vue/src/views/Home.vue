<template>
  <div class="home_box">
    <div class="home_bg">
      <p class="home_text">不知道说啥，给大家拜个晚年！</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style lang="less" scoped>
.home_bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 108px;
  background: url(../assets/comImg/home_bg.png) no-repeat center/cover;

  .home_text{
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    padding-top: 100px;
  }
}
</style>