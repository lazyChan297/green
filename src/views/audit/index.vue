<template>
    <div class="audit-wrapper">
        <div class="tab">
            <router-link tag="div" to="/audit/wait">
                <span>待审核</span>
            </router-link>
            <router-link tag="div" to="/audit/already">
                <span>已审核</span>
            </router-link>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
</script>
<style lang="stylus" scoped>
    @import '../../common/stylus/variable.styl'
    .audit-wrapper
        .tab
            display flex
            &>div
                flex 1
                line-height 40px
                height 40px
                color #030303
                font-size 14px
                &:first-child
                    text-align right
                    padding-right 10px
                &:last-child
                    padding-left 10px
                    text-align left
                &.router-link-exact-active
                    span
                        position relative
                        display inline-block
                        color $green
                        font-weight bold
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