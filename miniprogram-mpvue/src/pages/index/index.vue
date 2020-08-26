<template>
  <div class="myWrapper">
    <div class="myHeader">
      <div class="myHeader-left">
        <img src="../../../static/images/user.png" alt>
        <span>你好，{{user}}！</span>
      </div>
      <div class="myScan" @click="scanCodeInfo">
        <van-icon name="scan" size="40px" color="#fff"/>
      </div>
    </div>
    <van-cell-group>
      <van-cell icon="notes-o" is-link title="list" link-type="navigateTo" url="/pages/order/main"/>
      <van-cell
        icon="bar-chart-o"
        is-link
        title="counter"
        link-type="navigateTo"
        url="/pages/counter/main"
      />
    </van-cell-group>
    <div style="height:10px"></div>
    <van-cell-group>
      <van-cell
        icon="bar-chart-o"
        is-link
        title="blog"
        link-type="navigateTo"
        url="/pages/blog/main"
      />
      <van-cell
        icon="setting-o"
        is-link
        title="setting"
        link-type="navigateTo"
        url="/pages/setting/main"
      />
    </van-cell-group>
    <van-popup custom-style="background:transparent" :show="isLoading">
      <van-loading type="spinner" color="#fff"/>
    </van-popup>
    <van-dialog id="van-dialog"/>
  </div>
</template>

<script>
import { handleScan } from '@/utils/index'
export default {
  data() {
    return {
      user: '欢迎回来',
      codeInfo: '',
      isLoading: false
    }
  },
  onLoad() {
    if (!wx.getStorageSync('token')) {
      wx.reLaunch({ url: '../login/main' })
    }
    // this.getCode()
  },
  methods: {
    async scanCodeInfo() {
      let goods = await handleScan()
      this.codeInfo = goods.result
      this.isLoading = true
      wx.showToast({
        title: this.codeInfo,
        icon: 'none',
        duration: 7000
      })
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.myWrapper {
  height: 100%;
  background: $BgLight;
  .myHeader {
    background: $Primary;
    display: flex;
    height: 120rpx;
    align-items: center;
    padding: 0 40rpx 20rpx;
    /* margin-bottom: 20rpx; */
    justify-content: space-between;
    .myHeader-left {
      display: flex;
      align-items: center;

      img {
        height: 100rpx;
        width: 100rpx;
        border-radius: 5px;
        margin-right: 20rpx;
      }
      span {
        font-size: 28rpx;
        color: $White;
      }
    }
  }
}
</style>
