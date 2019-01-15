<template>
    <div class="setting-wrapper">
        <p class="title">{{userInfo.mobile?'修改手机号码':'绑定手机号码'}}</p>
        <div class="group">
            <div class="cell" v-if="!userInfo.mobile">
                <input type="text" placeholder="请输入手机号码" v-model="mobile">
            </div>
            <div class="cell" v-else>
                <span class="mobile">{{this.mobile}}</span>
            </div>
            <div class="cell">
                <input type="number" placeholder="请输入验证码" v-model="code">
                <span class="getCode" :class="{'waiting': waiting}" @click="getCode">{{getCodeTxt}}</span>
            </div>
        </div>
        <div class="submit" @click="submit">确认</div>
    </div>  
</template>
<script>
import {validPhone} from '@/common/js/validated'
import {mapGetters} from 'vuex'
import {Toast} from 'vux'
import Qs from 'qs'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      waiting: false,
      getCodeTxt: '发送验证码',
      hasConfirm: null
    }
  },
  created() {
    if (this.userInfo.mobile) {
        this.mobile = this.userInfo.mobile
    }
  },
  computed: {
    ...mapGetters([
        'userInfo'
    ])
  },
  methods: {
    getCode() {
        if (this.waiting) {
            return
        }
        let valid = validPhone(this.mobile)
        if (!valid) {
            return
        }
        let _type
        if (this.userInfo.mobile && !this.hasConfirm) {
            _type = 2
        } else if (this.userInfo.mobile && this.hasConfirm) {
            _type = 3
        } else if (!this.userInfo.mobile && !this.hasConfirm) {
            _type = 1
        }
        let params = Qs.stringify({mobile: this.mobile, type: _type})
        this.$axios.post('/users/sendSMS', params).then((res) => {
            // 发送成功
            if (res.status == 1) {
                let reset = 60
                let timer = setInterval(() => {
                    reset--
                    this.getCodeTxt = `${reset}秒后重新发送`
                    this.waiting = true
                    if (reset === 0) {
                        clearInterval(timer)
                        this.waiting = false
                        this.getCodeTxt = '发送验证码'
                    }
                }, 1000)
            }
        })
    },
    submit() {
        let params = Qs.stringify({mobile: this.mobile,code: this.code})
        this.$axios.post('/users/mobile', params).then(res => {
            if (res.status === 1) {
                this.$vux.toast.show({
                    text: res.info,
                    type: 'success'
                })
                this.$router.push('/my')
            } else {
                this.$vux.toast.show({
                    text: res.info,
                    type: 'warn'
                })
            }
            
        })
    }
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
        .group
            background #fff
            padding 0 15px
        .cell
            display flex
            justify-content space-between
            height 50px
            border-bottom 1px solid #e2e2e2
            line-height 50px
            &:last-child
                border none
            input::-webkit-input-placeholder
              color #b2b2b2
            input
              font-size 14px
              color #4a4a4a
              outline none
            .getCode
                color #4a4a4a
                font-size 14px
            .waiting
                color #b2b2b2
        .mobile
            color #4a4a4a
            font-size 14px
        .submit
            margin 20px 15px 0
            color #fff
            font-size 14px
            font-weight bold
            text-align center
            height 45px
            line-height 45px
            background linear-gradient(180deg,rgba(48,207,30,1) 0%,rgba(24,184,1,1) 100%)
            box-shadow 0px 4px 7px 0px rgba(30,137,19,0.3)
            border-radius 8px
</style>