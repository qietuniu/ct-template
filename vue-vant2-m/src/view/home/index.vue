<template>
  <div class="homeWrapper">
    <Header/>
    <Tab :list="tabOptions" :active="tab" @tabClick="tabClick"/>
    <Main  v-if="tab == 0"/>
    <List v-if="tab == 1"/>
  </div>
</template>

<script>
import Header from 'components/Header'
import Tab from 'components/Tab'
import List from './components/List'
import Main from './components/Main'
export default {
  data() {
    return {
      tabOptions: [{
        key: 0,
        value: '轮播图'
      }, {
        key: 1,
        value: '上拉加载'
      }]
    }
  },
  components: {
    Header,
    Tab,
    List,
    Main
  },
  computed: {
    tab(){
      return this.$store.getters.currentTab
    } 
  },
  created() {
  },
  mounted() {
  },
  methods: {
    tabClick(key) {
      this.$store.dispatch('ClickTab', key).then(() => {})
    }
  }
};
</script>

<style lang="less">
.homeWrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}
</style>