<template>
  <div class="settingWrapper">
    <van-cell-group>
      <van-cell icon="smile-o" title="exit" @click="logout" />
    </van-cell-group>
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    logout() {
      this.$store.dispatch('FedLogOut').then(() => {
        wx.reLaunch({ url: '../login/main' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.settingWrapper {
  height: 100%;
  background: $BgLight;
}
</style>
