<template>
    <div class="applySupplier-wrapper">
        <img src="../../common/images/supplier@3x.png" alt="" class="bgimg">
        <div class="title">招商联系人：熊向前</div>
        <a class="desc" href="tel:18577191364">
            18577191364
            <div class="icon icon-call">点击拨打</div>
        </a>
    </div>
</template>
<script>
import "../../common/css/media.css"
export default {
    data() {
    return {
        canIApply: true
    }
    }
}
</script>
<style lang="stylus" scoped>
    .applySupplier-wrapper
        text-align center
        padding-bottom 22px
    .bgimg
        width 100%
    .title
        color #4a4a4a
        font-size 14px
        margin 20px 0 10px
        text-align center
    .desc
        color #4a4a4a
        font-size 18px
        font-weight bold
        text-align center
        display inline-block
        position relative
    .icon
        font-size 12px
        color #fff
        text-align center
        line-height 30px
        position absolute
        right -64px
        top -8px
</style>