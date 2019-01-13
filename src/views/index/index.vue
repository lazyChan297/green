<template>
    <div class="index-wrapper">
        <div class="index-container">
          <!-- swiper -->
          <div class="swiper-container videoSwiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide video-slide">
                  <img src="../../common/images/banner/banner01.jpg" alt="">
                </div>
                <div class="swiper-slide video-slide">
                  <img src="../../common/images/banner/banner02.jpg" alt="">
                </div>
                <div class="swiper-slide video-slide">
                    <img src="../../common/images/banner/banner03.jpg" alt="">
                </div>
              </div>
            </div>
          <section>
            <p class="title">绿色资产</p>
            <div class="green-asstes">
              <img src="../../common/images/WechatIMG70.jpeg" alt="" width="100">
              <div>
                <p class="title">酱香黄檀活立木</p>
                <div class="sold">
                  <span class="price">¥25000</span>
                  <span class="icon icon-redcart"></span>
                </div>
              </div>
            </div>
          </section>
          <section>
              <p class="title">一县一品</p>
              <ul class="greenGoods">
                <router-link class="goods" :to="{path:`/goods/${item.id}`}" v-for="(item,index) in goods" :key="index">
                  <img :src="item.img" alt="">
                  <div>
                    <p class="title">{{item.name}}</p>
                    <div class="sold">
                        <span class="price">¥{{item.price}}</span>
                        <span class="icon icon-redcart"></span>
                      </div>
                  </div>
                </router-link>
              </ul>
          </section>
        </div>
        <footer-nav></footer-nav>
    </div>
</template>
<script>
import FooterNav from '@/components/FooterNav/index'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  data() {
    return {
      assets: {},
      goods: []
    }
  },
  mounted() {
      this.getIndex()
      this._inirSwiper()
  },
  methods: {
    getIndex() {
      this.$axios.get('/index').then((res) => {
        if (res.status === 1) {
          let goods = res.data.goods, ret = []
          goods.forEach((item, index) => {
            //if (item.type != 1) {
            //  ret.push(item)
            //}
            if (item.type == 1) {
               this.assets = item
             } else {
               ret.push(item)
             }
          })
          this.goods = ret
          console.log(this.goods)
          console.log(this.assets)
        }
      })
    },
    _inirSwiper() {
      var mySwiper = new Swiper('.videoSwiper', {
          autoplay:false,
          loop:true,
          centeredSlides: true,
          spaceBetween: 10,
          slidesPerView: 'auto'
        })
    }
  },
  components: {
    FooterNav,
    Swiper
  }
}
</script>
<style lang="stylus" scoped>
  @import "../../common/stylus/variable.styl"
  .swiper-container
      background:#fff
    .swiper-slide
      width:90% !important
      padding-top 10px
      padding-bottom 5px
      img
        width:100%
        box-shadow:0px 14px 15px -11px rgba(0,0,0,0.25)
        border-radius:10px
  .index-wrapper
    background $bgcolor
    .index-container
      padding-bottom 50px
      .title
        color $black
        font-weight bold
        font-size 14px
        line-height 40px
      section
        padding 0 15px
      .green-asstes
        display flex
        background #fff
        border-radius 8px
        height 100px
        &>img
          border-top-left-radius 8px
          border-bottom-left-radius 8px
        &>div
          padding-top 10px
          margin-left 10px
          padding-right 10px
          flex 1
          .title
            min-height 58px
            line-height 16px
      .greenGoods
        overflow hidden
       .goods
        float left
        width 48%
        background #fff
        padding-bottom 5px
        border-radius 8px
        margin-bottom 10px
        &:nth-child(odd)
          margin-right 10px
        &>img
          width 100%
          border-top-right-radius 8px
          border-top-left-radius 8px
        .title
          line-height 20px
          margin 5px 0 10px
        &>div
          padding 0 5px
      .price
        color $green
        font-size 16px
        font-weight bold
      .sold
        display flex
        justify-content space-between
</style>