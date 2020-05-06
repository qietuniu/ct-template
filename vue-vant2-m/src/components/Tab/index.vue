<template>
    <div class="tabContainer" :style="tabStyle">
      <div v-for="item in list" :key="item.key" :class="active == item.key?'tabItem active':'tabItem'" :style="tabItemStyle" @click="tabClick(item.key)">
        <span>{{item.value}}</span>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default: () => []
    },
    tabItemStyle: {
      type: String,
      default: null
    },
    tabStyle: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isLogin: true,
      show: false,
      searchKey: '',
      isSearch: false
    }
  },
  methods: {
    tabClick(key) {
      this.$emit('tabClick', key)
    },
    gotoHome() {
      this.$router.push({
        name: 'home'
      })
    },
    onSearch() {
      this.isSearch = true
    },
    onCancel() {
      this.show = false
      this.isSearch = false
      this.searchKey = ''
    }
  }
}
</script>

<style lang="less" scoped>

.tabContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid @Line;
  .tabItem {
    flex: 0 1 50%;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      display: inline-block;
      width: 57%;
      text-align: center;
      box-sizing: border-box;
      line-height: 30px;
    }
    &.active {
      span {
        display: inline-block;
        width: 57%;
        text-align: center;
        border-bottom: 2px solid @Orange;
        box-sizing: border-box;
        color: @Orange;
        line-height: 30px;
      }
    }
  }
}
</style>