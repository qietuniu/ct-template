<template>
  <div class="homeWrapper">
    <Header />
    <Tab :list="tabOptions" :active="tab" @tabClick="tabClick" />
    <Main v-if="tab == 0" />
    <List v-if="tab == 1" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Header from '../../components/Header/index.vue'
import Tab from '../../components/Tab/index.vue'
import List from './components/List.vue'
import Main from './components/Main.vue'
import { UserModule } from '@/store/modules/user'
interface TabOptionsData {
  key?: number
  value?: string
}
@Component({
  name: 'Home',
  components: {
    Header,
    Tab,
    List,
    Main
  }
})
export default class Home extends Vue {
  public tabOptions: Array<TabOptionsData> = [
    {
      key: 0,
      value: '轮播图'
    },
    {
      key: 1,
      value: '上拉加载'
    }
  ]
  get tab() {
    return UserModule.currentTab
    // return this.$store.getters.currentTab
  }
  tabClick(key: number): void {
    UserModule.ClickTab(key)
    // this.$store.dispatch('ClickTab', key).then(() => {})
  }
}
</script>

<style lang="less">
.homeWrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}
</style>
