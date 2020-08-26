<template>
  <div class="loginWrapper">
    <div class="logo">
      <img src="../../../static/images/logo.png" class="logo-img" alt>
    </div>
    <van-cell-group :border="false">
      <van-field
        :value="loginForm.account"
        placeholder="请输入账号"
        label="账号"
        left-icon="contact"
        size="large"
        class="form-control"
        @change="changeAccount"
      />
      <van-field
        :value="loginForm.password"
        placeholder="请输入密码"
        label="密码"
        left-icon="bag-o"
        size="large"
        type="password"
        class="form-control"
        @change="changePassword"
      />
    </van-cell-group>
    <div class="loginTip">账号密码任意填写，更多资料请查看切图妞个人博客</div>
    <van-button type="primary" round custom-class="login-btn" size="large" @click="login">登录</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        account: 'qietuniu',
        password: 'qietuniu'
      }
    }
  },
  onShow() {
    this.loginForm = {
      account: 'qietuniu',
      password: 'qietuniu'
    }
    if (wx.hideHomeButton) {
      wx.hideHomeButton()
    }
  },
  created() {
    // let app = getApp()
  },
  methods: {
    changeAccount(event) {
      this.loginForm.account = event.mp.detail
      console.log(this.loginForm.account)
    },
    changePassword(event) {
      this.loginForm.password = event.mp.detail
    },
    login() {
      if (this.loginForm.account === '') {
        return wx.showToast({
          title: '账号不能为空',
          icon: 'none',
          duration: 2000
        })
      }
      if (this.loginForm.password === '') {
        return wx.showToast({
          title: '密码不能为空',
          icon: 'none',
          duration: 2000
        })
      }
      this.$store
        .dispatch('Login', this.loginForm)
        .then(res => {
          console.log('进入首页了')
          if (res.status.code === 0) {
            this.$router.replace({ path: '../index/main' })
          } else {
            wx.showToast({
              title: '登录失败！',
              icon: 'none',
              duration: 2000
            })
          }
        })
        .catch(() => {
          // this.loading = false
        })
    }
  }
}
</script>

<style  lang="scss">
.loginWrapper {
  position: relative;
  height: 100%;
  padding-top: 50rpx;
  box-sizing: border-box;
  .van-field__input {
    font-size: 16px;
  }
  .van-button--info {
    background-color: $Primary;
    border-color: $Primary;
  }
  .logo {
    margin-bottom: 10px;
    text-align: center;
    .logo-img {
      width: 200rpx;
      height: 160rpx;
    }
  }
  .wxLogin {
    width: 340rpx;
    height: 80rpx;
    border-radius: 40rpx;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $BgLight;
    margin-bottom: 100rpx;
    .wxLogin-img {
      height: 24px;
      width: 24px;
      margin-right: 8px;
    }
    .wxLogin-txt {
      color: $MainText;
      font-size: 32rpx;
    }
  }
  .login-btn {
    position: absolute;
    width: 90%;
    left: 5%;
    bottom: 50rpx;
    background-color: $Primary;
    border-color: $Primary;
  }
  .loginTip {
    padding: 10px;
    color: #aaa;
    font-size: 12px;
    text-align: center;
  }
}
</style>
