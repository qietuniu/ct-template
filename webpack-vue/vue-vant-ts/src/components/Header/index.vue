<template>
  <div class="headerContainer">
    <router-link to="/home" class="logo">
      <img class="logoImg" src="../../assets/img/logo.png" alt />
      <span>切图妞</span>
    </router-link>
    <div class="info">
      <van-icon
        class="iconfont"
        class-prefix="icon"
        name="icon_seach"
        color="#9da7bf"
        size=".48rem"
        @click="show = true"
      />
      <div class="imgLink" @click="goLogin" v-if="!member">
        <van-icon
          v-if="!token"
          class="iconfont"
          class-prefix="icon"
          name="icon_my"
          color="#9da7bf"
          size=".48rem"
        />
      </div>
      <router-link class="imgLink" :to="{ path: '/member' }" v-if="!member">
        <img v-if="token" src="../../assets/img/logo.png" />
      </router-link>
    </div>
    <van-popup
      v-model="show"
      position="top"
      :style="{ height: isSearch ? '100%' : 'auto' }"
    >
      <van-search
        v-model="searchKey"
        show-action
        placeholder="搜索"
        @search="handleSearch"
        @cancel="handleCancel"
      />
      <div v-if="isSearch" class="searchContent">
        <div class="singleList" v-if="list.length != 0">
          <div class="singleTotal">
            共 {{ list.length }} 条 “ <span class="primary">{{ showText }}</span
            >” 相关的结果
          </div>
        </div>
        <div class="empty" v-else>
          <img src="../../assets/img/searchEmpty.png" />
          <div>
            没有找到“
            <span class="primary">{{ showText }}</span
            >” 相关的结果
          </div>
          <div>请尝试其他关键词搜索</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Search, Popup, Icon } from 'vant'
import { UserModule } from '@/store/modules/user'
@Component({
  name: 'Header',
  components: {
    [Search.name]: Search,
    [Popup.name]: Popup,
    [Icon.name]: Icon
  }
})
export default class Header extends Vue {
  @Prop() member?: boolean
  @Prop({ default: true }) isShow?: boolean
  @Prop({ default: true }) searchShow?: boolean
  show = false
  searchKey = ''
  showText = ''
  isSearch = false
  list = []
  defaultImg = require('../../assets/img/default.png')
  get token() {
    return UserModule.token
  }
  handleSearch() {
    this.isSearch = true
    this.showText = this.searchKey.trim()
    this.list = []
  }
  handleCancel() {
    this.show = false
    this.isSearch = false
    this.searchKey = ''
  }
  goLogin() {
    this.$router.push({
      name: 'login',
      params: { redirect: `${this.$route.path}` }
    })
  }
}
</script>
<style lang="less">
@import '../../assets/style/reset.less';
.primary {
  color: @Primary;
}
.headerContainer {
  position: relative;
  padding: 0.28rem 12px;
  display: flex;
  background: #fff;
  .logo {
    display: flex;
    flex: 2;
    align-items: center;
    color: @RegularText;
    font-size: 16px;
    font-weight: bold;
    img {
      height: 0.55rem;
      margin-right: 0.24rem;
    }
    span {
      display: inline-block;
      padding-left: 0.24rem;
      border-left: 1px solid #eee;
    }
  }
  .info {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    .icon {
      margin-left: 0.55rem;
    }
    .imgLink {
      height: 0.51rem;
    }
    img {
      height: 0.51rem;
      margin-left: 0.45rem;
    }
  }
  .van-popup {
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .van-search__content {
      border-radius: 0.48rem;
    }
    .searchContent {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: scroll;
    }
    .empty {
      padding-top: 30%;
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      color: @RegularText;
      img {
        width: 30%;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
