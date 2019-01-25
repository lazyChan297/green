<template>
    <div class="delivery-wrapper">
        <ul class="tab">
            <router-link to="/delivery/index" tag="li">
                <span>全部</span>
            </router-link>
            <router-link to="/delivery/wait" tag="li">
                <span>待发货</span>
            </router-link>
            <router-link to="/delivery/already" tag="li">
                <span>已发货</span>
            </router-link>
            <router-link to="/delivery/complete" tag="li">
                <span>已完成</span>
            </router-link>
        </ul>
        <router-view></router-view>
    </div>
</template>
<style lang=stylus scoped>
    @import '../../common/stylus/variable.styl'
    .delivery-wrapper
        .tab
            display flex
            background #fff
            margin-bottom 10px
            li
                flex 1
                line-height 40px
                text-align center
                span 
                    display inline-block
                    font-size 14px
                    color #4a4a4a
            .router-link-exact-active
                span
                    position relative
                    &:after
                        content ''
                        background $green
                        display block
                        position absolute
                        border-radius 2px
                        width 100%
                        height 4px
                        bottom 0
</style>