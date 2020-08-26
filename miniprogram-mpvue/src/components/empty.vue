<template>
  <div class="emptyWrapper">
    <img src="../../static/images/empty.png" class="empty-img" alt />
    <div class="empty-txt">{{text}}</div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '暂无数据'
    }
  }
}
</script>

<style  lang="scss" scoped>
.emptyWrapper{
    height:100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .empty-img{
      width: 200px;
      height: 200px;
    }
    .empty-txt{
margin-top: 40rpx;
      color:$SecondaryText;
    }
}
</style>
