<template>
  <div class="loginWrapper">
    <Header :isShow="false"/>
    <div class="loginContainer">
      <div class="title">登录</div>
      <van-cell-group>
        <van-field
          v-model="formData.username" 
          :error="errorMsg.username?true:false"
          placeholder="账号"
          @focus="onFocus('username')">
          <van-icon slot="left-icon" class="iconfont" class-prefix='icon' name='icon_my' />
        </van-field>
        <van-field 
          v-model="formData.password" 
          :error="errorMsg.password?true:false"
          :type="isSee?'':'password'"
          placeholder="密码"
          @focus="onFocus('password')">
          <van-icon slot="button" class="iconfont" class-prefix='icon' :name="isSee?'icon_key_open':'icon_key_close'" @click="showPwd"/>
          <van-icon slot="left-icon" class="iconfont" class-prefix='icon' name='icon_password' />
        </van-field>
      </van-cell-group>
      <div class="errorTip">{{errorTip}}</div>
      <van-button type="primary" block @click="handleLogin">登录</van-button>
      <a  class="otherLink" href="//www.qietuniu.com" >切图妞博客 >></a>
    </div>
    <van-overlay :show="loading">
      <van-loading type="spinner" />
    </van-overlay>
  </div>
</template>

<script>
import Header from 'components/Header'
import validator from '@/utils/validator'
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
      errorMsg: {
        username: false,
        password: false
      },
      rules: {
        username: [{ required: true, message: '账号必填' }],
        password: [{ required: true, message: '密码必填' }],
      },
      errorTip: '',
      redirect: undefined
    }
  },
  components: {
    Header
  },
  created() {
    console.log('this.redirect', this.redirect)
    this.validator = validator(this.rules, this.formData)
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
    // 验证
    validate(callback, data) {
      this.validator.validate((Err, errors, fields) => {
        this.resetField(fields)
        if (errors) {
          fields.forEach(item => {
            this.errorMsg[item.field] = item.message
          })
        }
        callback && callback(errors, fields)
      }, data)
    },
    resetField(attrs) {
      attrs = !attrs ? Object.keys(this.errorMsg) : Array.isArray(attrs) ? attrs : [attrs]
      attrs.forEach(attr => {
        this.errorMsg[attr] = false
      })
    },
    onFocus(key) {
      this.errorMsg[key] = false
    },
    handleLogin() {
      this.validate((errors) => {
        if (errors) return
        this.loading = true
        this.$store
        .dispatch('Login', { username: this.formData.username, password: this.formData.password })
        .then(() => {
          this.loading = false
          this.$router.replace({ path: this.redirect || '/' })
        })
        .catch((err) => {
          this.loading = false
          this.errorTip = err.msg
        })
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
  .errorTip{
    padding: 10px;
    font-size: 12px;
    color: red;
    min-height: 32px;
    text-align: center
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