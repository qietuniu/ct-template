<template>
  <van-swipe v-if="images.length!=0" :autoplay="3000">
    <van-swipe-item v-for="(item, index) in images" :key="index">
      <img v-lazy="item.url||defaultImg">
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  props: {
    images:{
      type: Array,
      defalut:()=>[]
    }
  },
  data() {
    return {
      defaultImg: require('../../assect/img/default.png')
    }
  },
  created() {
    console.log(this.images)
  }
}
</script>
<style lang="less" >
.van-swipe {
  height: 150px;
  .van-swipe__indicator--active {
    background-color: @Orange;
  }
  img {
    height: 100%;
    width: 100%;
  }
}
</style>