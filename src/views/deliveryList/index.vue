<template>
    <div class="deliveryList-wrapper" v-if="orderlist.length>0">
        <router-link tag="div" class="delivery" :to="{path:`/deliveryDetail/${item.orderNo}`}" v-for="(item,index) in orderlist" :key="index">
            <div class="tr">
                <span>状态</span>
                <span class="green" v-if="item.status==2">待发货</span>
                <span class="green" v-else-if="item.status==3">已发货</span>
                <span class="green" v-else="item.status==1">已完成</span>
            </div>
            <div class="goods" v-for="(goods, gindex) in item.goods">
                <img :src="goods.img" alt="" width="60" height="60">
                <div>
                    <div class="name">{{goods.name}}</div>
                    <div>
                        <span class="price">¥{{goods.price}}</span>
                        <span class="num">X{{goods.quantity}}</span>
                    </div>
                </div>
            </div>
            <div class="info">
                <p>
                    <span>收件人</span>
                    <span class="name">
                        <span>{{item.reciever}}</span>
                        <span class="mobile">{{item.mobile}}</span>
                    </span>
                </p>
                <p>
                    <span>收货地址</span>
                    <span>{{item.address}}</span>
                </p>
                <p>
                    <span>下单时间</span>
                    <span>{{item.orderCreatedAt}}</span>
                </p>
            </div>
            <div class="tr">
                <span>实付款</span>
                <span class="red">¥{{item.amount}}</span>
            </div>
            <!-- <div class="tr">
                <span></span>
                <span class="fh">我要发货</span>
            </div> -->
            <div class="tr" v-if="item.status!==2">
                <span></span>
                <span class="wl">查看物流</span>
            </div>
        </router-link>
    </div>
    <div v-else>
        <img src="../../common/images/empty.png" alt="" width="176" class="bgimg">
        <p class="desc">暂无任何订单记录～</p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            orderlist: []
        }
    },
    mounted() {
        this.getlist(this.$route.meta.type)
    },
    watch: {
        $route() {
            this.getlist(this.$route.meta.type)
        }
    },
    methods: {
        getlist(type) {
            let url = '/supplier/' + type
            this.$axios.get(url).then(res => {
                if (res.status === 1) {
                    this.orderlist = res.data
                }
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import "../../common/stylus//variable.styl"
    .delivery-wrapper
        .delivery
            background #fff
            margin-bottom 10px
            .goods
                display flex
                padding 10px 15px
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
                padding 0 15px
                align-items center
                &:last-child
                    border none
                &>span
                    font-size 14px
                    color $black 
                .red
                    color #FF6659
                    font-size 14px
                .green
                    color $green
                .fh,.wl
                    width 90px
                    text-align center
                    line-height 30px
                    height 30px
                    border-radius 8px
                .fh
                    background linear-gradient(180deg,rgba(48,207,30,1) 0%,rgba(24,184,1,1) 100%)
                    color #fff
                .wl
                    border 1px solid #b2b2b2
                    color #b2b2b2
            .info
                padding 10px 15px
                font-size 12px
                border-bottom 1px solid #e2e2e2
                p
                    display flex
                    &>span
                        line-height 17px
                        &:first-child
                            color #b2b2b2
                            width 60px
                        &:last-child
                            flex 1
                            color #4a4a4a
                    .name 
                        display flex
                        justify-content space-between
                    .mobile
                        color $green
    .desc
        color #b2b2b2
        font-size 12px
        text-align center
        margin-top 10px
    .bgimg
        display block
        margin 90px auto 0
</style>