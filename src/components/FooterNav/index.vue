<template>
    <ul class="footerNav-wrapper">
        <router-link class="footerNav-item" tag="div" v-for="(route, index) in routes" :to="{path:`${route.path}`}">
            <div :class="['icon',`${route.icon}`]"></div>
            <div class="text">{{route.text}}</div>
        </router-link>
    </ul>
</template>
<script>
  export default {
    data() {
      return {
        routes: [
          { path: '/', text: '首页', icon: 'icon-index'},
          { path: '/found', text: '发现', icon: 'icon-found'},
          { path: '/cart', text: '购物车', icon: 'icon-cart'},
          { path: '/my', text: '我的', icon: 'icon-my'},
        ]
      }
    }
  }
</script>
<style lang="stylus" scoped>
    .footerNav-wrapper
        position: fixed
        display: flex
        width: 100%
        height: 50px
        bottom: 0
        left 0
        background #fff
        .footerNav-item
            flex: 1
            text-align:center
          .text
            font-size 10px
            color #b2b2b2
</style>