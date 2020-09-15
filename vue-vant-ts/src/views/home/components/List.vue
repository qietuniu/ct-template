<template>
  <div class="listWrapper">
    <div class="filterContainer">
      <van-dropdown-menu active-color="#fc8b1f">
        <van-dropdown-item v-model="listQuery.sortBy" :options="sortOptions" @change="changeSort"/>
      </van-dropdown-menu>
      <div></div>
      <div class="selectTitle" @click="showPop">
        筛选
        <van-icon name="filter-o"/>
      </div>
      <van-popup
        v-model="show"
        v-if="show"
        position="right"
        :style="{
          width: '85%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }"
      >
        <div class="selectContent">
          <van-cell-group title="水果" :border="false">
            <div
              :class="tagId == null ? 'selectItem active' : 'selectItem'"
              @click="tagId = null"
            >全部</div>
            <div
              v-for="item in tagOptions"
              :key="item.id"
              :class="tagId == item.id ? 'selectItem active' : 'selectItem'"
              @click="tagId = item.id"
            >{{ item.name }}</div>
          </van-cell-group>
        </div>
        <div class="btnContainer" style="position:unset">
          <van-button @click="filterList(false)">重置</van-button>
          <van-button type="primary" @click="filterList(true)">确定</van-button>
        </div>
      </van-popup>
    </div>
    <div class="listContent">
      <div style="flex:1">
        <van-list v-model="loading" :finished="finished" class="listContainer" @load="getList">
          <div v-if="loading == false && list.length == 0" class="empty">暂无~</div>
          <div class="listItem" v-for="(item, index) in list" v-else :key="index">
            <img v-lazy="item.url">
            <div class="name">{{ item.name }}</div>
          </div>
        </van-list>
      </div>
      <Footer/>
    </div>

    <van-overlay :show="loading">
      <van-loading type="spinner"/>
    </van-overlay>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Footer from '../../../components/Footer/index.vue'
import {
  Cell,
  CellGroup,
  List,
  Icon,
  DropdownItem,
  DropdownMenu,
  Popup,
  Button
} from 'vant'
interface ListData {
  name?: string
  url?: string
}
@Component({
  name: 'CourseList',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [List.name]: List,
    [Icon.name]: Icon,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Popup.name]: Popup,
    [Button.name]: Button
  }
})
export default class CourseList extends Vue {
  private list: Array<ListData> = []
  private defaultList: Array<ListData> = new Array(10).fill({
    name: new Date().toTimeString(),
    url: require('../../../assets/img/1.jpg')
  })
  private loading = false
  private finished = true
  private listQuery = {
    tagId: null,
    pageSize: 10,
    pageNo: 1,
    sortBy: 1
  }
  private sortOptions = [
    { text: '最新', value: 1 },
    { text: '最热', value: 2 }
  ]
  private show = false
  private courseCategoryId = null
  private courseCategory = []
  private tagId = null
  private tagOptions = [
    { name: '苹果', id: 1 },
    { name: '梨', id: 2 }
  ]
  private defaultImg = require('../../../assets/img/default.png')
  created() {
    this.loading = true
    this.getList()
  }
  getList() {
    this.show = false
    setTimeout(() => {
      if (this.listQuery.pageNo == 1) {
        this.list = [...this.defaultList]
        this.listQuery.pageNo++
      } else {
        this.list.push(...this.defaultList)
      }
      this.finished = false
      this.loading = false
    }, 200)
  }

  filterList(type?: boolean) {
    if (!type) {
      this.tagId = null
    }
    this.listQuery.tagId = this.tagId
    this.listQuery.pageNo = 1
    this.loading = true
    this.getList()
  }

  changeSort() {
    this.listQuery.pageNo = 1
    this.getList()
  }

  showPop() {
    this.show = true
    this.tagId = this.listQuery.tagId
  }
}
</script>

<style lang="less">
@import '../../../assets/style/reset.less';
.listWrapper {
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  .selectContent {
    flex: 1;
    overflow: scroll;
  }
  .btnContainer {
    position: fixed;
    width: 100%;
    bottom: 0;
    .van-button {
      width: 50%;
      border-radius: 0;
    }
  }
  .listContent {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow-y: scroll;
    .listContainer {
      justify-content: flex-start;
      align-content: flex-start;
      margin-top: 12px;
    }
    .empty {
      color: @SecondText;
      width: 100%;
      padding: 40% 0;
      width: 100%;
      text-align: center;
    }
    .van-list__loading {
      width: 100%;
    }
  }
}
.filterContainer {
  display: flex;
  height: 45px;
  background: @Bg;
  justify-content: space-between;
  align-items: center;
  .van-dropdown-menu {
    height: 45px;
    background: @Bg;
    width: 33%;
    .van-dropdown-menu__bar {
      height: 45px;
      background-color: @Bg;
      box-shadow: none;
    }
    .van-dropdown-menu__title,
    .van-cell {
      font-size: 12px;
    }
  }
  .van-cell-group {
    display: flex;
    flex-wrap: wrap;
    .selectItem {
      padding: 0 18px;
      height: 28px;
      line-height: 28px;
      margin: 0 3% 12px;
      text-align: center;
      color: @RegularText;
      font-size: 12px;
      border-radius: 14px;
      border: 1px solid #ededed;
      &.active {
        color: @Primary;
        border-color: @Primary;
      }
    }
  }
  .selectTitle {
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    width: 33%;
    .van-icon {
      color: @RegularText;
    }
  }
}
</style>
