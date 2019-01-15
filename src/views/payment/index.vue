<template>
    <div class="payment-wrapper">
        <div class="userInfo" @click="chooseAddress">
            <div class="icon icon-location"></div>
            <div class="text" v-if="addressData">
                <p class="user">
                    {{addressData.reciever + ', ' + addressData.mobile}}
                </p>
                <p class="addr">
                    {{addressData.details}}
                </p>
            </div>
            <div class="text" v-else>
                <p class="empty">请选择地址</p>
            </div>
            <div class="icon icon-link"></div>
        </div>
        <div class="form">
            <p class="title tr"><span>商品</span></p>
            <div class="goods" v-for="(item,index) in cart.goods">
                <img :src="item.goodsImg" alt="" width="60" height="60">
                <div>
                    <div class="name">{{item.goodsName}}</div>
                    <div>
                        <span class="price">¥{{item.goodsPrice}}</span>
                        <span class="num">X{{item.quantity}}</span>
                    </div>
                </div>
            </div>
            <div class="tr">
                <span>总计</span>
                <span>¥{{cart.marketPriceSum}}</span>
            </div>
            <!-- <div class="tr">
                <span>运费</span>
                <span>¥0.00</span>
            </div> -->
            <div class="tr">
                <span>实付款</span>
                <span class="green">¥{{cart.marketPriceSum}}</span>
            </div>
        </div>
        <div class="submit" @click="prepay">
                去支付
            </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Qs from 'qs'
import {Toast} from 'vux'
export default {
 data() {
    return {
        addressData: null,
        cart: {}
    }
 },
 mounted() {
    this.getCart()
 },
 methods: {
    prepay() {
        if (!this.addressData) {
            this.$vux.toast.show({
                text: '请选择地址',
                type: 'warn'
            })
            return 
        }
        let addr = JSON.stringify({id: this.addressData.id})
        let params = Qs.stringify({addr})
        this.$axios.post('/cart/getPayArgs', params).then(res => {
            this.$wechat.chooseWXPay({
            timestamp: res.data.payargs.timeStamp,
            nonceStr: res.data.payargs.nonceStr +"",
            package: res.data.payargs.package +"",
            signType: res.data.payargs.signType +"",
            paySign: res.data.payargs.paySign +"",
            success: result => {
              if (result.errMsg == "chooseWXPay:ok") {
                window.location.href = global.serverHost + '/#/order/waitFH'
              }
            },
            cancel: result => {
              removeStore('userSn')
            }
          })
        })
    },
    chooseAddress() {
        let that = this
        this.$wechat.openAddress({
            success: res => {
                let addrInfo = JSON.stringify({
                    userName: res.userName,
                    telNumber: res.telNumber,
                    provinceName: res.provinceName,
                    cityName: res.cityName,
                    countyName: res.countryName,
                    detail: res.detailInfo,
                    postalCode: res.postalCode
                })
                let params = Qs.stringify({addrInfo})
                that.$axios.post('/users/addAddr', params).then(res => {
                    // alert(res)
                    if (res.status == 1) {
                        that.addressData = res.data.addr
                    }
                })
            }
        })
    },
    getCart() {
        this.$axios.get('/cart').then(res => {
            if (res.status === 1) {
                this.cart = res.data
                console.log(this.cart)
            }
        })
    }
 },
 computed: {
   ...mapGetters([
       'userInfo'
   ])
 }
}
</script>

<style lang="stylus" scoped>
    @import "../../common/stylus//variable.styl"
    .userInfo
        display flex
        align-items center
        background #fff
        border-bottom 2px dashed $green
        padding 15px
        margin-bottom 12px
        .text
            flex 1
        .empty
            color $green
        .user
            color #4a4a4a
            font-size 14px
            margin-bottom 10px
        .addr
            color #4a4a4a
            font-size 12px
            line-height 17px
    .form
        margin 0 15px
        background #fff
        padding 0 10px
        border-radius 8px
        .goods
            display flex
            padding 10px 0
            border-bottom 1px solid #e2e2e2
            &>div
                flex 1
                margin-left 10px
                .name
                    color $black
                    margin-bottom 20px
                .price,.num
                    color #b2b2b2
                    font-size 14px
                &>div
                    display flex
                    justify-content space-between
        .tr
            display flex
            justify-content space-between
            height 45px
            line-height 45px
            border-bottom 1px solid #e2e2e2
            &:last-child
                border none
            &>span
                font-size 14px
                color $black 
                &:first-child
                    color #b2b2b2
            .green
                color $green
                font-weight bold
                font-size 16px
    .submit
        margin 20px 15px 0
        color #fff
        height 45px
        line-height 45px
        text-align center
        background linear-gradient(180deg,rgba(48,207,30,1) 0%,rgba(24,184,1,1) 100%)
        box-shadow 0px 4px 7px 0px rgba(0,0,0,0.2)
        border-radius 8px
                

            
</style>