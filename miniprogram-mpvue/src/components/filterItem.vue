<template>
  <div class="filterLayer" v-if="isShow">
    <div
      :class="activeId==null?'filterLayer-item active':'filterLayer-item '"
      key="0"
      :data-value="null"
      @click="selectItem"
    >不限</div>
    <div
      :class="activeId==item.value?'filterLayer-item active':'filterLayer-item '"
      v-for="(item,index) in source"
      :key="index"
      :data-value="item.value"
      @click="selectItem"
    >{{item.label}}</div>
  </div>
</template>

<script>
export default {
  props: {
    source: {
      type: Array,
      default: []
    },
    isShow: {
      type: Boolean,
      default: false
    },
    activeId: {
      type: Number
    },
    index: {
      type: Number
    }
  },
  data() {
    return {

    }
  },
  methods: {
    selectItem(e) {
      let id = e.mp.currentTarget.dataset.value
      console.log(e.mp.currentTarget.dataset.value)
      this.$emit('change', id)
    }
  }
}
</script>
