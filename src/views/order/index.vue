<template>
    <div class="orderList-wrapper">
        <ul class="status">
            <router-link class="all" tag="li" :to="{path:'/order/all'}">全部</router-link>
            <router-link class="all" tag="li" :to="{path:'/order/waitFH'}">待发货</router-link>
            <router-link class="all" tag="li" :to="{path:'/order/waitSH'}">待收货</router-link>
            <router-link class="all" tag="li" :to="{path:'/order/complete'}">已完成</router-link>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        orders: []
      }
    },
    mounted() {
      this.getlist()
    },
    methods: {
      getlist() {
        this.$axios.get('/orders/all').then(res => {
          console.log(res)
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>
    .orderList-wrapper
        .status
            display flex
            background #fff
            line-height 40px
            text-align center
            li 
                position relative
                flex 1
                color #4a4a4a
                font-size 14px
                &.router-link-active
                    &:after
                        content ''
                        position absolute
                        display block
                        background linear-gradient(180deg,rgba(48,207,30,1) 0%,rgba(24,184,1,1) 100%)
                        width 24px
                        height 3px
                        transform translateX(-50%)
                        left 50%
                        border-radius 2px

</style>