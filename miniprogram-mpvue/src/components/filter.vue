<template>
  <div class="filterWrapper">
    <div class="filterTip">
      <div
        class="filterTip-item active"
        v-for="(item,index) in tabTxt"
        :key="index"
        :data-index="index"
        @click="filterTab"
      >
        <span>状态</span>
        <van-icon name="arrow-down"/>
      </div>
    </div>
    <div class="filterLayer">
      <div class="filterLayer-item">有效</div>
      <div class="filterLayer-item">无效</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style  lang="scss" scoped>

</style>
