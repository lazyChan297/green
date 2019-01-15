<template>
    <div class="inviteJoin-wrapper">
        <p class="title">邀请卡</p>
        <p class="desc">长按图片保存至相册</p>
        <div class="imgContainer">
            <img :src="qrCode" alt="">
        </div>
        
    </div>
</template>
<script>
export default {
  data() {
    return {
        qrCode: null
    }
  },
  mounted() {
    this.getInvite()
  },
  methods: {
    getInvite() {
        this.$axios.get('/users/getqrcode').then(res => {
            if (res.status === 1) {
                this.qrCode = res.data.qrCode
            }
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .inviteJoin-wrapper
    padding-top 13px
  .title
    font-size 18px
    color #4a4a4a
    font-weight bold
    text-align center
    line-height 25px
    margin-bottom 5px
 .desc
    font-size 14px
    color #4a4a4a
    line-height 20px
    text-align center
 .imgContainer
    margin 0 15px
    img
        width 100%
</style>