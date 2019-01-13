<template>
    <div class="cart-wrapper">
        <div class="cart-container" v-if="!isEmpty">
          <div class="vux-checker-box">
            <div v-for="(item,index) in goodslist" :key="index" :value="item" @click="checkClick(index)" class="vux-checker-item">
              <div class="icon icon-check" :class="{'active': item.checked}"></div>
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
            </div>
          </div>
          <div class="control">
            <div class="checkAll" :class="{'isCheckall':isCheckall}" @click="checkAll"><span class="icon icon-check"></span><span>全选</span></div>
            <div class="total">合计：<span class="green">¥{{total}}</span></div>
            <div class="submit" @click="submit">结算</div>
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
import Qs from 'qs'
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
      console.log('..')
      let total = 0, list = this.goodslist
      list.forEach((item, index) => {
        if (item.quantity >= 1 && item.checked) {
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
          if (!res.data.goods.length) {
            this.isEmpty = true
          }
          let goodslist = res.data.goods, ret = []
          goodslist.forEach((item,index) => {
            item.checked = true
            ret.push(item)
          })
          this.selectedList = ret
          this.goodslist = ret
          
        }
      })
    },
    // 是否全选
    checkAll() {
      this.isCheckall = !this.isCheckall
      let goodslist = this.goodslist
      goodslist.forEach((item, index) => {
        item.checked = this.isCheckall
      })
    },
    checkClick(index) {
      this.goodslist[index].checked = !this.goodslist[index].checked
      if (!this.goodslist[index].checked) {
        this.isCheckall = false
      }
    },
    submit() {
      let selected = [], goodslist = this.goodslist
      goodslist.forEach((item, index) => {
        if (item.quantity >= 1) {
          selected.push(item)
        }
      })
      selected = JSON.stringify(selected)
      let params = Qs.stringify({cart:selected})
    },
    addToCart() {
      let selected = [], goodslist = this.goodslist
      goodslist.forEach((item, index) => {
          selected.push(item)
      })
      let _selected = JSON.stringify({goods:selected})
      let params = Qs.stringify({cart:_selected})
      this.$axios.post('/cart', params).then((res) => {
          if (res.status === 1) {
              this.getCart()
          }
      })
    },
    addcart(goods) {
      goods.quantity = goods.quantity + 1
    },
    minuscart(goods) {
      let that = this
      if (goods.quantity == 0) {
        return
      } else if (goods.quantity - 1 == 0 ) {
        this.$vux.confirm.show({
          title: '提示信息',
          content: '确定要删除吗？',
          onConfirm () {
            goods.quantity = goods.quantity - 1
            // console.log(that.goodslist)
            that.addToCart()
          }
        })
      }
      else {
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
<style lang="stylus" scoped>
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