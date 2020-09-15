<template>
  <div class="tabContainer" :style="tabStyle">
    <div
      v-for="item in list"
      :key="item.key"
      :class="active == item.key ? 'tabItem active' : 'tabItem'"
      :style="tabItemStyle"
      @click="tabClick(item.key)"
    >
      <span>{{ item.value }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Row, Col } from 'vant'
interface TabOptionsData {
  key?: number
  value?: string
}
@Component({
  name: 'Tab'
})
export default class Tab extends Vue {
  @Prop({ default: 0 }) active?: number
  @Prop({
    type: Array,
    default: function(): Array<TabOptionsData> {
      return []
    }
  })
  list?: Array<TabOptionsData>
  @Prop({ default: null }) tabItemStyle?: string | null
  @Prop({ default: null }) tabStyle?: string | null

  private isLogin = true
  private show = false
  private searchKey = ''
  private isSearch = false

  tabClick(key?: number) {
    this.$emit('tabClick', key)
  }
  gotoHome() {
    this.$router.push({
      name: 'home'
    })
  }
  onSearch() {
    this.isSearch = true
  }
  onCancel() {
    this.show = false
    this.isSearch = false
    this.searchKey = ''
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/reset.less';
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
        line-height: 34px;
      }
    }
  }
}
</style>
