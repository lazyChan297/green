<template>
    <div class="auditDetail-wrapper">
        <section>
            <p class="title">申请人信息</p>
            <div class="form">
                <div class="cell">
                    <label class="name">姓名</label>
                    <span>{{details.name}}</span>
                </div>
                <div class="cell">
                    <label class="name">手机号</label>
                    <span>{{details.mobile}}</span>
                </div>
                <div class="cell">
                    <label class="name">微信昵称</label>
                    <span>
                        <img :src="details.invitorAvatar" alt="" width="30" height="30">
                        <span>{{details.nickname}}</span>
                    </span>
                </div>
                <div class="cell">
                    <label class="name">邀请人</label>
                    <span>
                        <img :src="details.invitorAvatar" alt="" width="30" height="30">
                        <span>{{details.invitorName}}</span>
                    </span>
                </div>
            </div>
        </section>
        <section v-if="details.type==1">
            <p class="title">代理商信息</p>
            <div class="form">
                <div class="cell">
                    <label>代理级别</label>
                    <span>{{details.agentlevel}}</span>
                </div>
                <div class="cell">
                    <label>选择地区</label>
                    <span>{{details.agentDistrict}}</span>
                </div>
                <div class="cell">
                    <label>申请时间</label>
                    <span>{{details.handledDate}}</span>
                </div>
            </div>
        </section>
        <section v-else>
            <p class="title">团长信息</p>
            <div class="form">
                <div class="cell">
                    <label>选择地区</label>
                    <span>1</span>
                </div>
                <div class="cell">
                    <label>小区名称</label>
                    <span>南宁</span>
                </div>
                <div class="cell">
                    <label>申请时间</label>
                    <span>2019-01-14 14:00:00</span>
                </div>
            </div>
        </section>
        <section>
            <p class="title">审核信息</p>
            <div class="form">
                <div class="cell">
                    <label>状态</label>
                    <span v-if="details.status==0">待审核</span>
                    <span v-else-if="details.status==1">申请通过</span>
                    <span v-else>已拒绝</span>
                </div>
                <div class="cell">
                    <label>审核时间</label>
                    <span>{{details.handledDate}}</span>
                </div>
            </div>
        </section>
        <div v-if="details.status==0">
            <div class="submit" @click="showDialog(true)">同意</div>
            <div class="cancel" @click="showDialog(false)">拒绝</div>
        </div>
        <x-dialog v-model="isShowDialog" hide-on-blur>
            <p class="text" v-html="dialog.text"></p>
            <div class="submit" @click="submit">确认</div>
            <div class="cancel" @click="cancel">取消</div>
        </x-dialog>
    </div>
</template>
<script>
import {XDialog} from 'vux'
import Qs from 'qs'
export default {
    data() {
        return {
            isShowDialog: false,
            dialog:{
                text: null
            },
            details: {}
        }
    },
    created() {
        this.getDetails()
    },
    components: {
        XDialog
    },
    methods: {
        getDetails() {
            this.$axios.get('/applier/details', {
                params: {id: this.$route.params.id}
            }).then(res => {
                if (res.status === 1) {
                    this.details = res.data.details
                }
            })
        },
        submit() {
            if (this.dialog.type) {
                this.handledApply(1)
            } else {
                this.handledApply(2)
            }
            this.hideDialog()
        },
        cancel() {
            this.hideDialog()
        },
        showDialog(flag) {
            this.isShowDialog = true
            if (flag) {
                this.dialog = {
                    text: `确认<span class="green">同意</span>该用户的申请吗？`,
                    type: true
                }
            } else {
                this.dialog = {
                    text: '确认<span class="red">拒绝</span>该用户的申请吗？',
                    type: false
                }
            }
        },
        hideDialog() {
            this.isShowDialog = false
        },
        handledApply(val) {
            let methods = null
            if (this.details.type == 1) {
				methods = '/agent/check'
			}else if (this.details.type == 2) {
				methods = '/distributor/check'
            }
            let params = Qs.stringify({id: this.details.id,
				value: val})
            this.$axios.post(methods, params).then(res => {
                if (res.status === 1) {
                    this.$vux.toast.show({
                        text: res.info,
                        type: 'success',
                        time: 500
                    })
                    let timer = setTimeout(()=> {
                        this.$router.push('/audit/already')
                    }, 500)
                }
            })
        }
    }
}
</script>
<style lang="stylus">
    @import '../../common/stylus/variable.styl'
    /* 弹框 */
    .vux-x-dialog
        .weui-dialog
            height 200px
            .text
                margin 40px auto
                font-size 14px
                .green
                    color $green
                .red
                    color #FF6659
            .submit
                color #fff
                background linear-gradient(180deg,rgba(48,207,30,1) 0%,rgba(24,184,1,1) 100%)
                box-shadow 0px 7px 10px -5px rgba(30,137,19,0.3)
                border-radius 8px
                line-height 45px
            div.cancel
                color #9b9b9b
                background #fff
                box-shadow none
                
</style>
<style lang="stylus" scoped>
    .auditDetail-wrapper
        section
            padding 0 15px
        .title
            line-height 45px
            font-size 16px
            font-weight bold
            color #4a4a4a
            padding-left 10px
        .form
            border-radius 8px
            background #fff
            padding 0 10px
            .cell
                display flex
                justify-content space-between
                height 45px
                border-bottom 1px solid #e2e2e2
                line-height 45px
                font-size 14px
                &:last-child
                    border-bottom none
                label
                    color #b2b2b2
                span
                    color #4a4a4a
                    img
                        border-radius 50%
                        vertical-align middle
                        margin-right 10px
                    &.refused
                        color #FF6659
        .submit, .cancel
            margin 10px 15px
            height 45px
            text-align center
            line-height 45px
            border-radius 8px
            color #fff
            font-size 14px
            font-weight bold
        .submit
            background linear-gradient(180deg,rgba(48,207,30,1) 0%,rgba(24,184,1,1) 100%)
            box-shadow 0px 4px 7px 0px rgba(30,137,19,0.3)
        .cancel
            background rgba(216,216,216,1)
            box-shadow 0px 4px 7px 0px rgba(178,178,178,0.2)
</style>