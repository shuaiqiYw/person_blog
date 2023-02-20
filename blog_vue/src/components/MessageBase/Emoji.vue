<template>
  <div>
      <b v-for="(item,index) in emoji" :key="index">{{item}}</b>
  </div>
</template>

<script>
export default {
    name:"Emoji",
    props:["emoji"],
   
}
</script>

<style>

</style>