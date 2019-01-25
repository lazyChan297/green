<template>
    <div class="goodDetail-wrapper">
        <div class="goodDetail-container">
            <div class="goodDetail-content">
                <!-- <img src="../../common/images/goods2.jpg" alt="" width="100%" class="bgImg"> -->
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in goods.imgs" :key="index">
                        <img :src="item.img" alt="" class="slideImg">
                    </swiper-slide>
                </swiper>
                <p class="price">¥{{goods.price}}</p>
                <p class="goodsName">{{goods.name}}</p>
                <p class="comment">
                    <span>商品评价</span>
                    <span>查看更多评价</span>
                </p>
                <div class="empty" v-if="comment.totalComments==0">
                    ~~~暂无评价内容
                </div>
                <p class="title">详情页</p>
                <div v-html="goods.details" class="details"></div>
            </div>
            <div class="control">
                <router-link to="/" tag="div">
                    <div class="icon icon-index"></div>
                    <p class="text">首页</p>
                </router-link>
                <router-link to="/cart" tag="div">
                    <div class="icon icon-cart">
                        <span class="num">{{cartLen}}</span>
                    </div>
                    <p class="text">购物车</p>
                </router-link>
                <div class="cart" @click="addToCart">
                    <p class="text">加入购物车</p>
                </div>
                <div class="pay">
                    <p class="text" @click="payment">购买</p>
                </div>
                <transition name="slide">
                    <div v-show="isShow" class="slideWindow">
                        <div class="close">
                            <div class="icon icon-close" @click="isShow = false"></div>
                        </div>
                        <div class="goods" v-if="goods.imgs && goods.imgs[0]">
                            <img :src="goods.imgs[0].img" alt="" width="60" height="60">
                            <div>
                                <p class="name">{{goods.name}}</p>
                                <p class="price">¥{{goods.price}}</p>
                            </div>
                        </div>
                        <div class="cart">
                            <span>数量：</span>
                                <cart-control :item="goods" @add="add" @minus="minus"></cart-control>
                            <span class="total">总计：</span><span class="green">¥{{goods.price * goods.quantity}}</span>
                        </div>
                        <div class="submit" @click="addToCart(false)">确定</div>
                    </div>
                </transition>
                <div class="mask" @click="isShow = false" v-show="isShow"></div>
            </div>
            
        </div>
        
    </div>
</template>
<script>
import CartControl from '@/components/cartcontrol/index'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {mapGetters, mapActions} from 'vuex'
import Qs from 'qs'
export default {
    data() {
      return {
        isShow: false,
        goods: {
          quantity: 1
        },
        // 幻灯片的配置项
        swiperOption: {
            notNextTick: true,
            pagination: '.swiper-pagination',
            paginationType : 'fraction',
            paginationClickable: true,
            loop: false,
            autoplay: 0,
            autoplayDisableOnInteraction: false      
        },
        comment: {}
      }
    },
    components: {
      CartControl,
      swiper,
      swiperSlide
    },
    mounted() {
        this.getGoods()
    },
    computed: {
      ...mapGetters([
          'cartLen'
      ])
    },
    methods: {
        add(goods) {
            this.goods.quantity++
        },
        minus() {
            if (this.goods.quantity === 0) {
                return
            }
            this.goods.quantity--
        },
        getGoods() {
            this.$axios.get('/goods/details', {
                params: { id: this.$route.params.id }
            }).then((res) => {
               let goods = Object.assign(this.goods, res.data.goods)
               this.goods = null
               this.goods = goods
               this.getComment()
            })
        },
        payment() {
            this.isShow = true
            // this.goods.quantity = 1
        },
        // 加入购物车
        addToCart(flag) {
            let goods = JSON.stringify({goods:[{goodsId: this.goods.id, quantity: this.goods.quantity }]})
            let params = Qs.stringify({cart:goods})
            this.$axios.post('/cart', params).then((res) => {
                if (res.status === 1) {
                    this.updateCartLen(res.data.goods.length)
                    if (flag) {
                        this.$vux.toast.show({
                            text: res.info,
                            time: 500
                        })
                    } else {
                        window.location.href = global.serverHost + '/newCart/pay/#/goods/payment/'
                    }
                }
            })
        },
        //获取评论
        getComment() {
            this.$axios.get('/comment/getDetailsByGoods', {
                params: {goodsId: this.$route.params.id}
            }).then(res => {
                if (res.status === 1) {
                    this.comment = res.data
                }
            })
        },
        // 购买
        submit() {
            // this.$router.push('/payment')
        },
        ...mapActions({
            updateCartLen: 'saveCartLen'
        })
    }
}
</script>
<style lang="stylus" scoped>
    @import '../../common/stylus/variable.styl'
    .details >>> img
        width 100%
        display block
    .slideImg
        width 100%
    .close
        text-align right
    .goodDetail-content
        margin-bottom 50px
    .icon-index,.icon-cart
        width 23px
        height 21px
        margin 8px auto 3px
    .slide-enter,.slide-leave-to
        transform translateY(100%)
    .slide-enter-active,.slide-leave-active
        transition all 0.25s
    .goodDetail-wrapper
        padding-bottom 50px
    .goodDetail-container
        .bgImg
            display block
        .green
            color $green
        .price
            color #FF6659
            font-size 20px
            font-weight bold
            background #fff
            padding-left 15px
            line-height 40px
        .goodsName
            color $black
            font-size 14px
            font-weight bold
            padding-left 15px
            background #fff
            line-height 40px
        .comment
            height 40px
            display flex
            align-items center
            justify-content space-between
            background #fff
            padding 0 15px
            margin-top 10px
            border-bottom 1px solid #e2e2e2
            span
                &:first-child
                    color #4a4a4a
                    font-size 16px
                &:last-child
                    color #b2b2b2
                    font-size 12px
            & + .empty
                height 57px
                line-height 57px
                text-align center
                color #b2b2b2
                font-size 12px
                background #fff
                margin-bottom 10px
        .title
            font-size 16px
            color $black
            background #fff
            line-height 40px
            padding-left 15px
            margin-top 10px
        .control
            position fixed
            display flex
            bottom 0
            left 0
            width 100%
            height 50px
            background #fff
            z-index 1
            &>div
                flex 1
                .text
                    text-align center
                    color $black
                    font-size 10px
                    line-height 20px
                    color #b2b2b2
                &.cart,
                &.pay
                    .text
                        color #fff
                        font-size 14px
                        font-weight bold
                        line-height 50px
                &.cart
                    background #F8C607
                &.pay
                    background #FF6659
        .slideWindow
            position absolute
            width 100%
            background #fff
            border-top-left-radius 8px
            border-top-right-radius 8px
            bottom 0
            .goods
                display flex
                padding 10px 15px
                .price
                    color #b2b2b2
                    font-weight normal
                    font-size 14px
                    padding 0
                .name
                    margin-bottom 10px
                &>div
                    padding-left 10px
            .cart
                display flex
                align-items center
                height 35px
                padding 0 15px 10px
                
                .total
                    flex 1
                    text-align right
            .submit
                height 45px
                background linear-gradient(180deg,rgba(48,207,30,1) 0%,rgba(24,184,1,1) 100%)
                box-shadow 0px 4px 7px 0px rgba(0,0,0,0.2)
                border-radius 8px
                line-height 45px
                color #fff
                text-align center
                margin 0 15px 10px
        .mask
            position fixed
            left 0
            top 0
            bottom 0
            right 0
            background rgba(0,0,0,0.3)
            z-index -1
        .icon
            position relative
            .num
                background #FF6659
                position absolute
                display block
                width 15px
                height 15px
                line-height 15px
                border-radius 50%
                color #fff
                top -5px
                right -8px
                text-align center
                font-size 12px
</style>