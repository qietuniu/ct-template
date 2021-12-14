<template>
  <div class="mainWrapper">
    <div style="flex:1">
      <!-- 左对齐 -->
      <Swiper :images="images"></Swiper>
      <van-row type="flex">
        <van-col span="6">span: 6</van-col>
        <van-col span="6">span: 6</van-col>
        <van-col span="6">span: 6</van-col>
      </van-row>

      <!-- 居中 -->
      <van-row type="flex" justify="center">
        <van-col span="6">span: 6</van-col>
        <van-col span="6">span: 6</van-col>
        <van-col span="6">span: 6</van-col>
      </van-row>

      <!-- 右对齐 -->
      <van-row type="flex" justify="end">
        <van-col span="6">span: 6</van-col>
        <van-col span="6">span: 6</van-col>
        <van-col span="6">span: 6</van-col>
      </van-row>

      <!-- 两端对齐 -->
      <van-row type="flex" justify="space-between">
        <van-col span="6">span: 6</van-col>
        <van-col span="6">span: 6</van-col>
        <van-col span="6">span: 6</van-col>
      </van-row>

      <!-- 每个元素的两侧间隔相等 -->
      <van-row type="flex" justify="space-around">
        <van-col span="6">span: 6</van-col>
        <van-col span="6">span: 6</van-col>
        <van-col span="6">span: 6</van-col>
      </van-row>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Swiper from 'components/Swiper'
import Footer from 'components/Footer'
export default {
  components: {
    Footer,
    Swiper
  },
  data() {
    return {
      images: [
        {
          id: 1,
          url: require('../../../assect/img/1.jpg')
        },
        {
          id: 2,
          url: require('../../../assect/img/2.jpg')
        },
        {
          id: 3,
          url: require('../../../assect/img/3.jpg')
        }
      ]
    }
  },
  computed: {
    token() {
      return this.$store.getters.token
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="less">
.mainWrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: scroll;
  .van-row{
    margin-bottom: 40px;
  }
  .van-col{
    height: 80px;
    line-height: 80px;
    color: #fff;
    text-align: center;
    &:nth-child(odd) {
      background-color: #39a9ed;
    }
    &:nth-child(even) {
      background-color: #66c6f2;
    }
  }
}
</style>