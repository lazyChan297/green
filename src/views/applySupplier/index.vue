<template>
    <div class="applySupplier-wrapper">
        <div class="available">
            <div class="header">
                <p class="title">申请成为供货商</p>
                <p class="desc">需要您填写真实姓名并验证手机，申请后工作人员将会主动联系您</p>
            </div>
            <div class="form">
                <div class="tr">
                    <label for="">姓名</label>
                    <input type="text" placeholder="请输入真实姓名">
                </div>
                <div class="tr">
                    <label for="">手机</label>
                    <input type="text" placeholder="请输入手机号" class="mobile">
                    <span class="getCode">获取验证码</span>
                </div>
                <div class="tr">
                    <label for="">验证码</label>
                    <input type="text" placeholder="请输入验证码">
                </div>
            </div>
            <div class="submit">提交申请</div>
        </div>
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
  .available
    .header
        background url('../../common/images/red.png') no-repeat center
        border-bottom-left-radius 18px
        border-bottom-right-radius 18px
        height 135px
        color #fff
        padding-top 30px
        .title
            margin-left 30px
            font-size 18px
            font-weight bold
            line-height 25px
            margin-bottom 10px
        .desc 
            margin-left 30px
            font-size 14px
            line-height 20px
    .form
        background #fff
        margin -30px 15px 0
        border-radius 8px
        padding 0 15px
        .tr 
            display flex
            height 45px
            line-height 45px
            border-bottom 1px solid #e2e2e2
            &:last-child
                border none
            label
                color #4a4a4a
                font-size 12px
                width 55px
            input
                flex 1
                color #b2b2b2
                font-size 12px
                outline none
            input::-webkit-input-placeholder
                color #b2b2b2
                font-size 12px
            .tip
                color #b2b2b2
                font-size 12px
            .getCode
                display block
                height 24px
                padding-left 17px
                margin 10px 5px 10px 0px
                border-left 1px solid #b2b2b2
                line-height 24px
                font-size 12px
                color #4a4a4a
    .submit
        color #fff
        height:45px
        background linear-gradient(180deg,rgba(255,102,89,1) 0%,rgba(232,45,29,1) 100%)
        box-shadow 0px 4px 7px 0px rgba(212,63,50,0.3)
        border-radius 8px
        text-align center
        line-height 45px
        margin 20px 15px 0
</style>