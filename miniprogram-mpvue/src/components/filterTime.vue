<template>
  <div class="filterLayer" v-if="isShow">
    <div class="timeWrapper">
      <div class="timeItem" @click="showTime('start')">{{startTime||'开始时间'}}</div> 
      <span class="centerTxt">至</span>
      <div class="timeItem" @click="showTime('end')">{{endTime||'结束时间'}}</div>
    </div>

    <van-button round type="info" size="large" @click="onConfirm">确定</van-button>
    <van-popup :show="timePop" label="发生时间" position="bottom" :overlay="true">
      <van-datetime-picker
        v-model="currentTime"
        type="datetime"
        @cancel="timePop = false"
        @confirm="confirmTime"
      />
    </van-popup>
  </div>
</template>

<script>
import { getDay } from '@/utils/utils'
export default {
  props: {
    start: {
      type: String,
      default: null
    },
    end: {
      type: String,
      default: null
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      startTime: null,
      endTime: null,
      currentTime: null,
      timePop: false,
      type: 'start'
    }
  },
  methods: {
    showTime(type) {
      this.type = type
      if (this.type === 'start') {
        this.currentTime = new Date(this.startTime).getTime() || new Date().getTime()
      } else {
        this.currentTime = new Date(this.endTime).getTime() || new Date().getTime()
      }
      this.timePop = true
    },
    confirmTime(e) {
      if (this.type === 'start') {
        this.startTime = getDay('dayTime', new Date(e.mp.detail))
      } else {
        this.endTime = getDay('dayTime', new Date(e.mp.detail))
      }
      this.timePop = false
    },
    onConfirm() {
      this.$emit('change', { start: this.startTime, end: this.endTime })
    }
  }
}
</script>
<style lang="scss">
.timeWrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  padding:10px 0;
  font-size: 14px;
  color: $RegularText;
  .timeItem{
    min-width: 350rpx;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: $MainText;
  }
}
.filterLayer {
  .van-button--info {
    height: 40px;
    line-height: 40px;
    width: 80%;
    background-color: $Primary;
    border-color: $Primary
  }
}
</style>

