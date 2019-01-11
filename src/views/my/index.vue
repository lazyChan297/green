<template>
    <div class="my-wrapper">
        <div class="my-container">
          <div class="header">
            <div>
              <img :src="userInfo.avatarUrl" alt="" width="60" height="60">
              <div class="user">
                  <p class="name">{{userInfo.nickName}}</p>
                  <p class="desc">我的身份： 普通客户</p>
              </div>
              <div class="icon icon-setting"></div>
            </div>
          </div>
          <section class="order">
            <router-link class="title" to="" tag="p">
              <span>我的订单</span>
              <router-link to="order" tag="span">查看全部订单</router-link>
            </router-link>
            <div>
              <router-link to="/order/waitFH" tag="div" class="statu">
                <div class="icon icon-dfh"></div>
                <span>待发货</span>
              </router-link>
              <router-link to="/order/waitSH" tag="div" class="statu">
                <div class="icon icon-dsh"></div>
                <span>待收货</span>
              </router-link>
              <router-link to="/order/waitPJ" tag="div" class="statu">
                <div class="icon icon-dpj"></div>
                <span>待评价</span>
              </router-link>
              <router-link to="/order/complet" tag="div" class="statu">
                <div class="icon icon-ywc"></div>
                <span>已完成</span>
              </router-link>
            </div>
          </section>
          <section class="apply">
            <router-link to="/applySecond" tag="div">
              <div class="icon icon-tuanzhang"></div>
              <div class="text">团长申请</div>
              <div class="icon icon-link"></div>
            </router-link>
            <router-link to="/applyFirst" tag="div">
                <div class="icon icon-dls"></div>
                <div class="text">代理商申请</div>
                <div class="icon icon-link"></div>
              </router-link>
              <router-link to="/applySupplier" tag="div">
                  <div class="icon icon-ghs"></div>
                  <div class="text">供货商申请</div>
                  <div class="icon icon-link"></div>
              </router-link>
          </section>
          <section class="QRcode">
            <div>
              <img src="../../common/images/yaoqing.png" width="54" alt="">
              <p class="desc">邀请好友</p>
              <p class="invite">立即邀请</p>
            </div>
          </section>
        </div>
        <footer-nav></footer-nav>
    </div>
</template>
<script>
import FooterNav from '@/components/FooterNav/index'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    FooterNav
  },
  mounted() {
    this.getUserCenter()
  },
  methods: {
    getUserCenter() {
      this.$axios.get('/home/myCenter').then(res => {
        if (res.status === 1) {
          let userInfo = this.userInfo
          let _userInfo = Object.assign(userInfo, res.data)
          this.saveUserInfo(_userInfo)
        }
      })
    },
    ...mapMutations({
      saveUserInfo: 'SAVE_USERINFO'
    })
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  }
}
</script>
<style lang="stylus" scoped>
  @import '../../common/stylus/variable.styl'
  .header
    background url('../../common/images/mybgimg.jpg') no-repeat center
    border-bottom-left-radius 18px
    border-bottom-right-radius 18px
    background-size 100%
    height 150px
    padding-top 23px
    box-sizing border-box
  .header>div
    display flex
    /* background $green */
    padding 0 15px
    align-items: center
    img
      border-radius 50%
    .user
      color #fff
      margin-left 10px
      flex 1
      .name
        font-size 14px
        margin-bottom 5px
      .desc
        font-size 10px
  .order
    margin -50px 15px 0
    background #fff
    border-top-left-radius 8px
    border-top-right-radius 8px
    .title
      line-height 40px
      display flex
      justify-content space-between
      margin 0 10px
      border-bottom 1px solid #e2e2e2
      span
        color #4a4a4a
        &:firsh-child
          font-size 14px
        &:last-child
          font-size 10px
    &>div
      display flex
      height 70px
      .statu
        flex 1
        text-align center
        height 100%
        span
          color #4a4a4a
          font-size 12px
  .apply
    margin 10px 15px
    border-radius 8px
    background #fff
    padding 0 10px
    &>div
      line-height 50px
      font-size 14px
      color #4a4a4a
      border-bottom 1px solid #e2e2e2
      display flex
      align-items center
      &:last-child
        border none
      .icon
        margin-left 5px
      .text
        flex 1
        margin-left 5px
  .QRcode
    margin 10px 15px
    border-radius 8px
    background #fff
    padding 0 10px
    &>div
      display flex
      align-items center
      padding 10px 0
    .desc
      flex 1
      color #4a4a4a
      font-size 12px
      margin-left 10px
    .invite
      background #FF6659
      color #fff
      font-size 10px
      text-align center
      width 60
      line-height 18px
      border-radius 20px
      padding 0 10px
</style>