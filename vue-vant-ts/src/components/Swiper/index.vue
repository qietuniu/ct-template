<template>
  <van-swipe v-if="images.length != 0" :autoplay="3000">
    <van-swipe-item v-for="(item, index) in images" :key="index">
      <img v-lazy="item.url || defaultImg">
    </van-swipe-item>
  </van-swipe>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Swipe, SwipeItem } from 'vant'
interface ImagesData {
  id: number
  url: string
}
@Component({
  name: 'Swiper',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  }
})
export default class Swiper extends Vue {
  @Prop({
    type: Array,
    default: function(): Array<ImagesData> {
      return []
    }
  })
  images?: Array<ImagesData>
  private defaultImg = require('../../assets/img/default.png')
  created() {
    console.log(this.images)
  }
}
</script>
<style lang="less">
.van-swipe {
  height: 150px;
  img {
    height: 100%;
    width: 100%;
  }
}
</style>
