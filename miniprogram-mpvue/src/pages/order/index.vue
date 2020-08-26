<template>
  <div class="turnoverWrapper">
    <van-search v-model="keyword" placeholder="请输入名称" use-action-slot @search="onSearch">
      <view slot="action" @click="onReset">重置</view>
    </van-search>
    <div class="filterWrapper">
      <div class="filterTip">
        <div class="filterTip-item" @click.stop="showDate">
          <span>{{tabTxt[0]}}</span>
          <van-icon :name="dateShow?'arrow-up':'arrow-down'" />
        </div>
        <div class="filterTip-item" @click.stop="showEnabled">
          <span>{{tabTxt[1]}}</span>
          <van-icon :name="enabledShow?'arrow-up':'arrow-down'" />
        </div>
        <div class="filterTip-item" @click.stop="showLayer">
          <span>时间段</span>
          <van-icon :name="timeShow?'arrow-up':'arrow-down'" />
        </div>
      </div>
      <filter-item
        :source="dateOptions"
        :isShow="dateShow"
        :activeId="listQuery.dateType"
        @change="dateChange"
      />
      <filter-item
        :source="statusOptions"
        :isShow="enabledShow"
        :activeId="listQuery.enabled"
        @change="enabledChange"
      />
      <div class="filterLayer" v-if="timeShow">
        <div class="timeWrapper">
          <div class="timeItem" @click="showTime('start')">{{fromTime||'开始时间'}}</div>
          <span class="centerTxt">至</span>
          <div class="timeItem" @click="showTime('end')">{{toTime||'结束时间'}}</div>
        </div>
        <van-button round type="info" size="large" @click="timeChange">确定</van-button>
      </div>
    </div>

    <div class="orderList" v-if="list.length!=0">
      <van-card
        v-for="(item, index) in list"
        :key="index"
        @longpress="handleDelete"
        :id="item.id"
        :data-enabled="item.enabled"
        :title="item.name"
        :price="item.amount "
        :desc="item.createdTime"
        :tag="item.hot==2?'':'热销'"
        :thumb="item.fileUris!=null?item.fileUris[0]:defaultImg"
        thumb-mode="scaleToFill"
      />
    </div>
    <Empty v-else />

    <bottom-btn text="新增" @bottomEvent="goAdd" />
    <van-popup custom-style="background:transparent" :show="isLoading">
      <van-loading type="spinner" color="#fff" />
    </van-popup>
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
    <!-- 时间 -->
    <van-popup :show="timePop" label="type" position="bottom" :overlay="true">
      <van-datetime-picker
        v-model="currentTime"
        type="datetime"
        :formatter="formatterTime"
        @cancel="timePop = false"
        @confirm="confirmTime"
      />
    </van-popup>
  </div>
</template>

<script>
// import { getList, deleteSetting } from '@/api/turnover'
import Dialog from 'vant-weapp/dist/dialog/dialog'
import Toast from 'vant-weapp/dist/toast/toast'
import Empty from '@/components/empty'
import FilterItem from '@/components/filterItem'
import BottomBtn from '@/components/bottomBtn'
import { getDay } from '@/utils/utils'
export default {
  data() {
    return {
      keyword: '',
      list: new Array(10),
      listQuery: {
        page: 1,
        count: 10,
        keyword: '',
        enabled: null,
        dateType: null,
        fromTime: null,
        toTime: null,
        sorts: [
          {
            field: 'createdTime',
            order: 'desc'
          }
        ]
      },
      totalPage: 0,
      isLoading: false,
      dateOptions: [
        { value: 1, label: '水果' },
        { value: 2, label: '零食' },
        { value: 3, label: '蔬菜' },
        { value: 4, label: '肉类' },
        { value: 5, label: '海鲜' }
      ],
      statusOptions: [{ value: 1, label: '无效' }, { value: 2, label: '有效' }],
      enabledShow: false,
      dateShow: false,
      tabTxt: ['分类', '状态'],
      timeShow: false,
      fromTime: null,
      toTime: null,
      currentTime: null,
      timePop: false,
      type: 'start',
      defaultImg: require('../../../static/images/empty3.png'),
      isBack: false,
      formatterTime(type, value) {
        if (type === 'year') {
          return `${value}年`
        } else if (type === 'month') {
          return `${value}月`
        } else if (type === 'day') {
          return `${value}日`
        } else if (type === 'hour') {
          return `${value}时`
        } else if (type === 'minute') {
          return `${value}分`
        }
        return value
      }
    }
  },
  components: {
    Empty,
    FilterItem,
    BottomBtn
  },
  onLoad(option) {
    if (option) {
      this.isBack = option
    }
    if (this.isBack) {
      this.onReset()
    } else {
      this.initList()
    }
  },
  onShow() {
    if (this.isBack) {
      this.isBack = false
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })
    }
  },
  methods: {
    // 筛选
    initList() {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })
      this.isLoading = true
      this.listQuery.page = 1
      this.getList()
    },
    dateChange(id) {
      this.listQuery.dateType = id
      this.tabTxt[0] = id ? this.dateOptions[id - 1].label : '不限'
      this.closeLayer()
      this.initList()
    },
    enabledChange(id) {
      this.listQuery.enabled = id
      this.tabTxt[1] = id ? this.statusOptions[id - 1].label : '不限'
      this.closeLayer()
      this.initList()
    },
    showDate() {
      this.enabledShow = false
      this.timeShow = false
      this.dateShow = !this.dateShow
    },
    showEnabled() {
      this.dateShow = false
      this.timeShow = false
      this.enabledShow = !this.enabledShow
    },
    showLayer() {
      this.timeShow = !this.timeShow
    },
    showTime(type) {
      this.type = type
      if (this.type === 'start') {
        this.currentTime = new Date(this.fromTime).getTime() || new Date().getTime()
      } else {
        this.currentTime = new Date(this.toTime).getTime() || new Date().getTime()
      }
      this.timePop = true
    },
    confirmTime(e) {
      if (this.type === 'start') {
        this.fromTime = getDay('dayTime', new Date(e.mp.detail))
      } else {
        this.toTime = getDay('dayTime', new Date(e.mp.detail))
      }
      this.timePop = false
    },
    timeChange() {
      this.listQuery.fromTime = this.fromTime
      this.listQuery.toTime = this.toTime
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })
      this.listQuery.page = 1
      this.isLoading = true
      this.closeLayer()
      this.initList()
    },
    closeLayer() {
      this.enabledShow = false
      this.dateShow = false
      this.timeShow = false
    },
    onSearch(e) {
      this.listQuery.page = 1
      this.listQuery.keyword = e.mp.detail
      this.keyword = e.mp.detail
      this.getList()
    },
    onReset() {
      this.isLoading = true
      this.listQuery = {
        page: 1,
        count: 10,
        keyword: '',
        enabled: null,
        dateType: null,
        fromTime: null,
        toTime: null,
        sorts: [
          {
            field: 'createdTime',
            order: 'desc'
          }
        ]
      }
      this.fromTime = null
      this.toTime = null
      this.currentTime = null
      this.timePop = false
      this.keyword = ''
      this.tabTxt = ['分类', '状态', '商铺']
      this.initList()
    },
    getList() {
      wx.stopPullDownRefresh()
      this.list.fill({
        amount: 666,
        name: '饼干',
        desc: '好吃的'
      })
      this.isLoading = false
    },
    handleDelete(e) {
      Dialog.confirm({
        title: '删除数据',
        message: '确认删除该数据吗？',
        asyncClose: true
      }).then(() => {
        Toast.success('删除成功')
      }).catch(() => {
        Dialog.close()
      })
    },
    goAdd(e) {
      Toast.success('暂不开放')
    }
  },
  onPullDownRefresh() {
    this.listQuery.page = 1
    this.getList()
  },
  onReachBottom() {
    if (this.listQuery.page > this.totalPage) {
      console.log('数据加载完了')
    } else {
      this.listQuery.page++
      this.getList()
    }
  }
}
</script>

<style  lang="scss">
.turnoverWrapper {
  position: relative;
  box-sizing: border-box;
  background: $BgLight;
  min-height: 100vh;
  padding-top: 95px;
  padding-bottom: 80px;
  overflow: hidden;
  .van-card {
    background: $White;
    border-radius: 10rpx;
    margin: 20rpx 20rpx 0;
    .van-card__thumb {
      height: 55px;
      width: 55px;
      .van-card__img {
        border-radius: 5px;
      }
    }
    .van-card__title {
      color: $MainText;
      font-size: 28rpx;
    }
    .van-card__desc {
      color: $SecondaryText;
    }
    .van-card__price {
      color: $Primary;
    }
    .van-card__num {
      color: $RegularText;
    }
  }

  .ml10 {
    margin-left: 20rpx;
  }
}
</style>
