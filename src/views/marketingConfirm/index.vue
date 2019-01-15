<template>
    <div class="inviteConfirm-wrapper">
        <div class="confirm-container">
            <div class="content" v-if="user">
                <img :src="user.avatar" alt="" width="75" height="75" class="avatar">
                <p class="name">{{ user.nickname}}</p>
                <p class="desc">邀请你加入山羊森林</p>
                <div class="submit" @click="submit">接受邀请</div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Qs from 'qs'
export default {
    data() {
        return {
            user: null
        }
    },
    mounted() {
        this.getUserInfo()
    },
    methods: {
        getUserInfo() {
            let userSn = this.$route.query.userSn
            console.log(userSn)
            let params = Qs.stringify({userSn: userSn})
            this.$axios.post('/users/getSharerInfo', params).then(res => {
                console.log(res)
                if (res.status === 1) {
                    this.user = res.data
                }
            })
        },
        submit() {
            if (this.userInfo.invitor == 1) {
                this.$vux.toast.show({
                    type: 'warn',
                    text: '您已经绑定了邀请关系~',
                    width: 'auto',
                    position: 'middle',
                    time: 1000
                })
                let timer = setTimeout(() => {
                    this.$router.push('/')
                }, 1000)
                return
            }
            let userSn = this.$route.query.userSn
            let params = Qs.stringify({invitor: userSn})
            this.$axios.post('/users/setInvitor', params).then(res => {
                if (res.status == 1) {
                    this.$vux.toast.show({
                        text: '设置成功',
                        type: 'success',
                        time: 1000
                    })
                    let timer = setTimeout(() => {
                        this.$router.push('/')
                    }, 1000)
                    
                } else {
                    this.$vux.toast.show({
                        text: res.info,
                        type: 'warn'
                    })
                }
            })
        }
    },
    computed: {
        ...mapGetters([
            'userInfo'
        ])
    }
}
</script>
<style lang="stylus" scoped>
    .inviteConfirm-wrapper
        padding-top 148px
        .confirm-container
            text-align center
            height 200px
            margin 0 25px 0
            background #fff
            box-shadow 0px 5px 12px 0px rgba(0,0,0,0.1)
            border-radius 8px
            .content
                transform translateY(-42px)
            .avatar
                border-radius 50%
                display block
                margin 0 auto
            .name
                color #4a4a4a
                margin-top 10px
                line-height 22px
            .desc
                color #b2b2b2
                font-size 12px
                margin-bottom 40px
            .submit
                height 45px
                background linear-gradient(180deg,rgba(48,207,30,1) 0%,rgba(24,184,1,1) 100%)
                box-shadow 0px 4px 7px 0px rgba(30,137,19,0.3)
                border-radius 23px
                line-height 45px
                text-align center
                color #fff
                font-size 14px
                font-weight bold
                margin 0 37px
</style>