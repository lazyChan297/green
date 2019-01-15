<template>
  <div class="setting-wrapper">
    <p class="title">基本信息</p>
    <div class="group">
        <section class="cell">
            <span>头像</span>
            <img :src="userInfo.avatarUrl" alt="" width="36" height="36" class="avatar">
        </section>
        <section class="cell">
            <span>昵称</span>
            <span>{{userInfo.nickName}}</span>
        </section>
        <router-link tag="section" class="cell" to="/bindPhone">
            <span>手机号</span>
            <span class="mobile">
                <span>{{userInfo.mobile}}</span>
                <span class="icon icon-link"></span>
            </span>
        </router-link>
        <section class="cell" v-if="userInfo.invitor!==0">
            <span>邀请人</span>
            <span>{{userInfo.invitorName}}</span>
        </section>
    </div>
  </div>  
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters([
        'userInfo'
    ])
  }
}
</script>
<style lang="stylus" scoped>
    .setting-wrapper
        .title
            color #b2b2b2
            font-size 14px
            line-height 50px
            padding-left 15px
        .avatar
            border-radius 50%
        .group
            background #fff
            padding 0 15px
        .cell
            display flex
            justify-content space-between
            height 50px
            border-bottom 1px solid #e2e2e2
            line-height 50px
            align-items center
            &:last-child
                border none
            span:first-child
                color #4a4a4a
                font-size 14px
            span:last-child
                color #b2b2b2
                font-size 14px
        .mobile
            display flex
            align-items center
            font-size 14px
            span
                color #b2b2b2 !important
</style>