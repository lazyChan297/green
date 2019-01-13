<template>
    <div class="payment-wrapper">
        <div class="userInfo" @click="chooseAddress">
            <div class="icon icon-location"></div>
            <div class="text">
                <p class="user">
                    zhangsan,18677485124
                </p>
                <p class="addr">
                        广西壮族自治区 南宁市 青秀区 民族大道131号会展中心航洋城
                </p>
            </div>
            <div class="icon icon-link"></div>
        </div>
        <div class="form">
            <p class="title tr"><span>商品</span></p>
            <div class="goods">
                <img src="../../common/images/goods2.jpg" alt="" width="60" height="60">
                <div>
                    <div class="name">name</div>
                    <div>
                        <span class="price">¥25.00</span>
                        <span class="num">X1</span>
                    </div>
                </div>
            </div>
            <div class="tr">
                <span>总计</span>
                <span>¥25.00</span>
            </div>
            <div class="tr">
                <span>运费</span>
                <span>¥0.00</span>
            </div>
            <div class="tr">
                <span>实付款</span>
                <span class="green">¥25.00</span>
            </div>
            
        </div>
        <div class="submit">
                去支付
            </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
 methods: {
    chooseAddress() {
        this.$wechat.openAddress({
            success: res => {
                console.log(res)
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