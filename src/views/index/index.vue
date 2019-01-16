<template>
    <div class="index-wrapper">
        <div class="index-container">
          <!-- swiper -->
          <div class="swiper-container videoSwiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide video-slide" v-for="(item) in banners">
                <img :src="item" alt="">
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
                <router-link class="goods" :to="{path:`/goodsDetail/${item.id}`}" v-for="(item,index) in goods" :key="index">
                  <img :src="item.img" alt="">
                  <div>
                    <p class="title">{{item.name}}</p>
                    <div class="sold">
                        <span class="price">¥{{item.price}}</span>
                        <span class="icon icon-redcart" @click.stop.prevent="addToCart(item)"></span>
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
import Qs from 'qs'
import {mapActions} from 'vuex'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data() {
    return {
      assets: {},
      goods: [],
      banners: [],
      // 幻灯片的配置项
      swiperOption: {
            notNextTick: true,
            pagination: '.swiper-pagination',
            paginationType : 'fraction',
            paginationClickable: true,
            loop: false,
            autoplay: 0,
            autoplayDisableOnInteraction: false      
        }
    }
  },
  mounted() {
      this.getIndex()
  },
  methods: {
    getIndex() {
      this.$axios.get('/index').then((res) => {
        if (res.status === 1) {
          this.banners = res.data.banners
          var mySwiper = new Swiper('.videoSwiper', {
            observer:true,//修改swiper自己或子元素时，自动初始化swiper    重要
            observeParents:true,//修改swiper的父元素时，自动初始化swiper  重要
            autoplay:false,
            loop:true,
            centeredSlides: true,
            spaceBetween: 10,
            slidesPerView: 'auto'
          })
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
        }
      })
    },
    // 加入购物车
    addToCart(goods) {
      let _goods = JSON.stringify({goods:[{goodsId: goods.id, quantity: goods.quantity }]})
      let params = Qs.stringify({cart:_goods})
      this.$axios.post('/cart', params).then((res) => {
          if (res.status === 1) {
              this.$vux.toast.show({
                text: '加入购物车成功～',
                time: 500,
                type: 'success'
              })
              this.updateCartLen(res.data.goods.length)
          } else {
              this.$vux.toast.show({
                text: res.info,
                time: 500,
                type: 'warn'
              })
          }
      })
    },
    ...mapActions({
      updateCartLen: 'saveCartLen'
    })
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
        font-size 16px
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
          &>.title
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
          font-size 14px 
        &>div
          padding 0 5px
      .price
        color #FF6659
        font-size 16px
        font-weight bold
      .sold
        display flex
        justify-content space-between
</style>