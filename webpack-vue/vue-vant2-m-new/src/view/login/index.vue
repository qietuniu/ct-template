<template>
  <div class="loginWrapper">
    <Header :isShow="false"/>
    <div class="loginContainer">
      <div class="title">登录</div>
      
      <van-form @submit="handleLogin">
        <van-field
          v-model="formData.username"
          placeholder="手机号"
          :rules="[{ required: true, message: '请输入手机号' }, { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误' }]">
          <van-icon slot="left-icon" class="iconfont" class-prefix='icon' name='icon_my' />
        </van-field>
        <van-field 
          v-model="formData.password"
          :type="isSee?'':'password'"
          :rules="[{ required: true, message: '请填写密码' }]"
          placeholder="密码">
          <van-icon slot="button" class="iconfont" class-prefix='icon' :name="isSee?'icon_key_open':'icon_key_close'" @click="showPwd"/>
          <van-icon slot="left-icon" class="iconfont" class-prefix='icon' name='icon_password' />
        </van-field>
        <van-button type="primary" block native-type="submit">登录</van-button>

      <a  class="otherLink" href="//www.qietuniu.com" >切图妞博客 >></a>
      </van-form>
    </div>
    <van-overlay :show="loading">
      <van-loading type="spinner" />
    </van-overlay>
  </div>
</template>

<script>
import Header from 'components/Header'
export default {
  data() {
    return {
      loading: false,
      isSee: false,
      account: '',
      pwd: '',
      formData: {
        username: '',
        password: ''
      },
      redirect: undefined
    }
  },
  components: {
    Header
  },
  created() {
  },
  mounted() {
    if(this.$store.getters.token) {
      this.$router.replace({ path: this.redirect || '/' })
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        console.log('route', route)
        this.redirect = route.params && route.params.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      this.isSee = !this.isSee
    },
    handleLogin() {
      this.loading = true
      this.$store
      .dispatch('Login', { username: this.formData.username, password: this.formData.password })
      .then(() => {
        this.loading = false
        this.$router.replace({ path: this.redirect || '/' })
      })
      .catch((err) => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.loginContainer {
  padding: 30% 10%;
  .title {
    margin-bottom: 40px;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    color: @RegularText;
  }
  .icon-icon_key_open, .icon-icon_key_close{
    font-size: 12px;
  }
  
  .van-button{
    margin-top: 20px;
  }
  .otherLink{
    display: block;
    text-align: right;
    color: @Primary;
    padding: 10px;
    font-size: 16px;
  }
}
</style>