<template>
  <div class="uploader">
    <div class="uploaderItem">
      <div v-for="(item, index) in files" :key="index" class="uploaderItem-img" :id="item">
        <img :src="item" @click="predivImage" :id="item" />
        <img class="deleteImg" src="../../static/images/delete.png"  @click.stop="deleteImg(index)"/>
      </div>
    </div>
    <div class="uploaderItem" v-if="files.length<limit">
      <div class="uploaderItem-input" @click="chooseImage">
        <van-icon name="plus" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    files: {
      type: Array,
      default: []
    },
    fileIds: {
      type: Array,
      default: []
    },
    limit: {
      type: Number,
      default: 3
    }
  },
  methods: {
    chooseImage(e) {
      let that = this
      wx.chooseImage({
        count: that.limit - this.files.length,
        success: function(res) {
          var tempFilePaths = res.tempFilePaths
          wx.showLoading()
          that.uploadImage(tempFilePaths)
        },
        fail: function() { }
      })
    },
    uploadImage(data) {
      let that = this
      let i = data.i ? data.i : 0
      let success = data.success ? data.success : 0
      let fail = data.fail ? data.fail : 0
      const timestamp = new Date().getTime()
      let token = ''
      if (wx.getStorageSync('token')) {
        token = wx.getStorageSync('token')
      } else {
        wx.redirectTo({ url: '/pages/login/main' })
      }
      wx.uploadFile({
        url: '', // 上传url
        filePath: data[i],
        name: 'file',
        header: {
          accessToken: token
        },
        formData: {
          code: timestamp,
          note: that.text,
          name: that.text + timestamp,
          enabled: 2
        },
        success: function(response) {
          var res = JSON.parse(response.data)
          if (res.status.code === 0) {
            if (i === (data.length - 1)) {
              wx.hideLoading()
            }
            that.$emit('chooseImage', { id: res.id, uri: res.uri })
          } else {
            wx.showToast({
              title: res.status.message,
              icon: 'none'
            })
            fail++
            wx.hideLoading()
          }
        },
        fail: function(resf) {
          fail++
          if (i === (data.length - 1)) {
            wx.hideLoading()
          }
        },
        complete: function() {
          i++
          if (i === data.length) {
            console.log('执行完毕')
            console.log('成功：' + success + ' 失败：' + fail)
            that.isClicking = false
          } else {
            data.i = i
            data.success = success
            data.fail = fail
            that.uploadImage(data)
          }
        }
      })
    },
    predivImage(e) {
      wx.previewImage({
        current: e.currentTarget.id,
        urls: this.files
      })
    },
    deleteImg(index) {
      this.$emit('deleteImg', index)
    }
  }
}
</script>

<style  lang="scss">
.uploader {
  display: flex;
  align-items: center;
  .uploaderItem {
    display: flex;
    align-items: center;
    .uploaderItem-input {
      height: 60px;
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid $Line;
      margin: 10px 0 0 0;
      .van-icon {
        color: &Line;
        font-size: 28px;
      }
    }
    .uploaderItem-img {
      position: relative;
      height: 60px;
      width: 60px;
      margin: 10px 15px 0 0;
      img {
        height: 60px;
        width: 60px;
      }
      img.deleteImg {
        position: absolute;
        right: -10px;
        top: -10px;
        height: 20px;
        width: 20px;
      }
    }
  }
}
</style>
