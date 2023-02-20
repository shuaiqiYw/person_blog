<template>
  <div class="friendLink_show">
    <a
       v-for="(item, index) in linkArr"
      :href="item.blogUrl"
      :key="index"
      class="link_list"
    >
      <p class="link_img_box"><img :src="item.logoUrl" alt="" /></p>
      <div class="link_text_box">
        <p>{{ item.blogName }}</p>
        <p>{{ item.blogDescribe }}</p>
      </div>
    </a>
  </div>
</template>

<script>
export default {
    name:"LinksChild",
    props:["linkArr"]
};
</script>

<style lang="less" scoped>
.friendLink_show {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .link_list {
    width: 49%;
    height: 66px;
    background: #f5f5f5;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 10px;

    .link_img_box {
      width: 50px;
      height: 50px;
      float: left;
      margin: 8px 0 8px 8px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .link_text_box {
      margin: 8px 0 8px 14px;
      font-size: 14px;
      font-weight: 400;
      line-height: 25px;
      float: left;
    }
  }

}
</style>