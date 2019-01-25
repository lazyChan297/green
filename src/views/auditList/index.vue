<template>
    <div class="auditList-wrapper" v-if="list.length>0">
        <router-link tag="div" :to="{path:`/auditDetail/${item.id}`}" v-for="(item,index) in list">
            <div class="slogan second" v-if="item.type==2">团</div>
            <div class="slogan first" v-if="item.type==1">代</div>
            <div class="text">
                <p>
                    <span class="name">{{item.nickname}}</span>
                    <span class="status">{{item.status==0?'待审核':'已审核'}}</span>
                </p>
                <p>
                    <span class="reason">{{item.type==2?'申请成为团长':'申请成为代理商'}}</span>
                    <span class="date">{{item.appliedDate}}</span>
                </p>
            </div>
        </router-link>
    </div>
    <div class="auditList-wrapper" v-else>
        <img src="../../common/images/empty.png" alt="" class="empty">
        <p class="desc">暂无数据</p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: []
        }
    },
    mounted() {
        this.getlist()
    },
    watch: {
        $route() {
            this.getlist()
        }
    },
    methods: {
        getlist() {
            let name = this.$route.name,
            status = name === 'wait' ? 0 : 1
            this.$axios.get('/applier/list', {
                params: {status: status}
            }).then(res => {
                if (res.status === 1) {
                    this.list = res.data.applicationList
                }
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import '../../common/stylus/variable.styl'
    .auditList-wrapper
        &>div
            display flex
            align-items center
            padding 15px 10px
            margin 10px 15px 0
            background #fff
            border-radius 8px
            .slogan
                width 50px
                height 50px
                border-radius 50%
                color #fff
                font-size 20px
                font-weight bold
                text-align center
                line-height 50px
                &.second
                    background linear-gradient(135deg,rgba(150,241,140,1) 0%,rgba(24,184,1,1) 100%)
                &.first
                    background linear-gradient(350deg,rgba(112,156,253,1) 0%,rgba(93,191,254,1) 100%)
            .text
                margin-left 10px
                flex 1
                p
                    display flex
                    justify-content space-between
            .name,.status
                font-size 14px
                line-height 20px
            .name
                color #4a4a4a
                font-weight bold
            .status
                color $green
            .reason,.date
                color #b2b2b2
                font-size 12px
                line-height 17px
        .empty
            display block
            margin 170px auto 20px
        .desc
            color #4a4a4a
            font-size 14px
            text-align center
</style>
