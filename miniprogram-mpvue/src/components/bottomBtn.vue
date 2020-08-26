<template>
  <div class="bottomBtn">
    <van-button round type="info" size="large" class="operBtn" @click="bottomEvent">{{text}}</van-button>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    bottomEvent() {
      this.$emit('bottomEvent')
    }
  }
}
</script>

<style  lang="scss">
.bottomBtn {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 20rpx;
  background: $White;
  .van-button--info {
    background-color: $Primary;
    border-color: $Primary
  }
}
</style>
