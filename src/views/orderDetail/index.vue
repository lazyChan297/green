<template>
    <div class="orderDetail-wrapper">
        <p class="status">
            <span>状态</span>
            <span>待发货</span>
        </p>
        <div class="express-wrapper">
            <div class="express">
                <div class="icon icon-express"></div>
                <div class="text">
                    <p class="green">已签收</p>
                    <p class="date">2017-10-1 10:10:00</p>
                </div>
                <div class="icon icon-link"></div>
            </div>
        </div>
        <div class="userInfo">
            <div class="icon icon-location"></div>
            <div class="user">
                <p class="name">{{details.reciever}},{{details.mobild}}</p>
                <p class="addr">{{details.address}}</p>
            </div>
            <div class="icon icon-link"></div>
        </div>
        <div class="form">
            <div class="goods" v-for="(goods, index) in details.goods">
                <img :src="goods.img" alt="" width="60" height="60">
                <div>
                    <p class="name">{{goods.name}}</p>
                    <p>
                        <span class="price">¥{{goods.price}}</span>
                        <span class="num">x{{goods.quantity}}</span>
                    </p>
                </div>
            </div>
            <!-- <div class="tr">
                <span>运费</span>
                <span>¥25.00</span>
            </div> -->
            <div class="tr">
                <span>实付款</span>
                <span>¥{{details.amount}}</span>
            </div>
        </div>
        <div class="orderInfo">
            <p><span>订单号：{{details.orderNo}}</span><span class="copy">复制</span></p>
            <p><span>下单时间:{{details.orderCreatedAt}}</span></p>
        </div>
    </div>
</template>
<script>
export default {
  data() {
      return {
          details: {}
      }
  },
  mounted() {
    this.getDetails()
  },
  methods: {
    getDetails() {
        this.$axios.get('/orders/details', {
          params: {
            no: this.$route.params.id
          }
        }).then(res => {
            if (res.status === 1) {
                this.details = res.data
            }
        })
    }    
  }
}
</script>
<style lang="stylus" scoped>
    @import "../../common/stylus/variable.styl"
    .icon-location
        height 20px
    .orderDetail-wrapper
        .status
            display flex
            justify-content space-between
            line-height 40px
            background #fff
            padding 0 15px
            margin-bottom 10px
            span
                font-size 14px
                &:first-child
                    color #4a4a4a
                &:last-child
                    color $green
        .express-wrapper
            background #fff
            padding 0 15px
            .express
                padding 10px 0
                border-bottom 1px solid #e2e2e2
                align-items center
        .userInfo
            margin-bottom 10px
            align-items center
        .userInfo,
        .express
            display flex
            background #fff
            padding 10px 15px
            .text
                flex 1
            .green
                color $green
                font-size 14px
                margin-bottom 5px
                line-height 20px
            .date 
                color #b2b2b2
                font-size 14px
            .user
                flex 1
            .name
                color #4a4a4a
                font-size 14px
                margin-bottom 10px
            .addr
                color #4a4a4a
                font-size 14px
                line-height 17px
        .form
            padding 0 10px
            background #fff
            margin-bottom 10px
        .goods
            display flex
            padding 10px 15px
            border-bottom 1px solid #e2e2e2
            &>p
                flex 1
                justify-content space-between
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
                &:last-child
                    color $green
                    font-weight bold
        .orderInfo
            font-size 12px
            color #b2b2b2
            background #fff
            padding 10px 15px
            line-height 20px
            .copy
                margin-left 5px
                border 1px solid
                border-radius 3px
                padding 0 3px
</style>