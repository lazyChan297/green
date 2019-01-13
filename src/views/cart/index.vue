<template>
    <div class="cart-wrapper">
        <div class="cart-container" v-if="!isEmpty">
          <checker selected-item-class="active" default-item-class="demo1-item" type="checkbox" @on-change="checkGoods" v-model="selectedList">
            <checker-item v-for="(item,index) in goodslist" :key="index" :value="item">
              <!-- <div class="icon icon-check"></div> -->
              <div class="img">
                  <img :src="item.goodsImg" width="85" height="85">
              </div>
              <div class="goods">
                <p class="name">{{item.goodsName}}</p>
                <div class="sold">
                  <span class="price">¥{{item.goodsPrice}}</span>
                  <cart-control @add="addcart(item)" @minus="minuscart(item)" :item="item"></cart-control>
                </div>
              </div>
            </checker-item>
          </checker>
          <div class="control">
            <div class="total">合计：<span class="green">¥{{total}}</span></div>
            <div class="submit">结算</div>
          </div>
        </div>
        <div class="cart-empty" v-else>
          <img src="../../common/images/guwukong.png" alt="">
          <p class="desc">购物车空空如也，赶紧去逛逛吧～</p>
          <router-link tag="div" class="navigator" to="/">去购物</router-link>
        </div>
    </div>
</template>
<script>
import FooterNav from '@/components/FooterNav/index'
import CartControl from '@/components/cartcontrol/index'
import { Checker, CheckerItem } from 'vux'
export default {
  data() {
    return {
      goodslist: [],
      selectedList: [],
      isEmpty: false,
      isCheckall: true
    }
  },
  mounted() {
    this.getCart()
  },
  computed: {
    total() {
      let total = 0, list = this.goodslist
      list.forEach((item, index) => {
        if (item.quantity >= 1) {
          console.log(item.quantity)
          total += item.quantity * item.goodsPrice
        }
      })
      return total
    }
  },
  methods: {
    getCart() {
      this.$axios.get('/cart').then(res => {
        if (res.status === 1) {
          // console.log()
          if (!res.data) {
            this.isEmpty = true
          }
          this.goodslist = res.data.goods
          let goodslist = res.data.goods, ret = []
          goodslist.forEach((item,index) => {
            ret.push(item)
          })
          this.selectedList = ret
          
        }
      })
    },
    checkGoods(list) {
      if (list.length === 0) {
        this.isCheckall = false
        console.log('.')
        return
      }
      console.log(list)
    },
    // 是否全选
    checkAll() {
      
    },
    addcart(goods) {
      goods.quantity = goods.quantity + 1
    },
    minuscart(goods) {
      if (goods.quantity == 0) {
        return
      } else {
        goods.quantity = goods.quantity - 1
      }
      
    }
  },
  components: {
    FooterNav,
    Checker,
    CheckerItem,
    CartControl
  }
}
</script>
<style lang="stylus">
  @import "../../common/stylus/variable.styl"
  .cart-empty
    padding-top 107px
    img
      display block
      margin 0 auto 20px
    .desc
      color #4a4a4a
      font-size 14px
      text-align center
    .navigator
      width 120px
      height 45px
      line-height 45px
      color #fff
      margin 20px auto 0
      text-align center
      background linear-gradient(180deg,rgba(48,207,30,1) 0%,rgba(24,184,1,1) 100%)
      box-shadow 0px 2px 4px 0px rgba(30,137,19,0.3)
      border-radius 8px
  .vux-checker-box
    padding-top 10px
    .vux-tap-active:active
      background-color #fff
    .vux-checker-item
      display flex
      align-items center
      background #fff
      padding 12px 10px
      margin 0 15px
      margin-bottom 10px
      img
        margin-right 10px
      .sold
        display flex
        flex 1
      .name
        color $black
        font-weight bold
        font-size 14px
        height 60px
      .goods
        flex 1
      .sold
        width 100%
        justify-content space-between
        .price
          color $green
          font-weight bold
  .control
    position fixed
    display flex
    width 100%
    left 0
    bottom 0
    height 50px
    line-height 50px
    border-top 1px solid #e2e2e2
    .checkAll
      font-size 12px
      color #4a4a4a
      padding-left 15px
      span, .icon-check
        display inline-block
        vertical-align middle
    .total
      flex 1
      text-align right
      font-size 14px
      padding-right 10px
      .green
        color $green
        font-weight bold
    .submit
      background linear-gradient(180deg,rgba(48,207,30,1) 0%,rgba(24,184,1,1) 100%)
      width 100px
      color #fff
      font-size 14px
      text-align center
  .cartcontrol
    .minus,.plus,.num
      display inline-block
      vertical-align middle
    .num
      margin 0 15px
      color $black
</style>