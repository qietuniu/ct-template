<template>
  <div class="memberWrapper" v-if="token">
    <Header :member="true"/>
    <div class="userContent">
      <div class="imgInfo">
        <img src="../../assect/img/logo.png">
      </div>
      <div class="userInfo">
        <div class="title">欢迎你，{{userName}}！</div>
      </div>
    </div>
    <van-cell-group class="memberList">
      <a href="//www.qietuniu.com">
        <van-cell title="切图妞博客" icon="todo-list" is-link/>
      </a>
      <a href="//github.com/qietuniu">
        <van-cell title="Github" icon="todo-list" is-link/>
      </a>
      <a href="//segmentfault.com/u/qietuniu">
        <van-cell title="Segmentfault" icon="todo-list" is-link/>
      </a>
    </van-cell-group>
    <div class="exitBtn" @click="handleExit">退出账号</div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import Header from '@/components/Header'
export default {
  data() {
    return {
      tab: 0,
      active: 1,
      activeNames: '1',
      isLoading: false,
      isLogin: true,
      studyTime: '',
      userName: Cookies.get('userName'),
    }
  },
  components: {
    Header
  },
  computed: {
    token() {
      return this.$store.getters.token
    }
  },
  watch: {

  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleExit() {
      this.$dialog.confirm({
        title: '切图妞提醒您',
        message: '是否退出登录'
      }).then(() => {
        this.$store.dispatch('Logout').then(() => {
          this.$router.push({
            name: 'login'
          })
        })
      }).catch(() => {
        // on cancel
      });
    }
  }
};
</script>

<style lang="less">
.memberWrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  .memberList {
    .van-icon {
      color: #99a4bd;
    }
    .van-cell {
      border-bottom: 1px solid @Line;
    }
  }
  .userContent {
    display: flex;
    padding: 0 24px;
    height: 122px;
    align-items: center;
    justify-content: flex-start;
    background: #efc216;
    .imgInfo {
      width: 64px;
      padding: 4px;
      background: #423b25;
      border-radius: 50%;
      margin-right: 12px;
      img {
        width: 100%;
      }
    }
    .userInfo {
      .title {
        font-size: 30px;
        color: #fff;
        margin-bottom: 4px;
      }
    }
  }
  .exitBtn {
    position: absolute;
    bottom: 10%;
    margin: 0 25%;
    width: 50%;
    text-align: center;
    border: 1px solid @Line;
    padding: 8px 0;
    font-size: 14px;
    color: @SecondText;
  }
}
</style>