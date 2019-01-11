<template>
    <div class="applyFirst-wrapper">
        <div class="disable" v-if="userInfo.agentApplication==''">
            <img src="../../common/images/561547027740_.pic_hd.jpg" alt="" class="bgimg">
            <div class="desc-container">
                <p class="desc">对不起，您还未购买任何一款绿色资产产品，不符合代理商申请条件！请您先去购买。</p>
            </div>
            <router-link to="/" class="submit" tag="div">去购买</router-link>
        </div>
        <div class="waitingValid" v-else-if="userInfo.agentApplication==0">
            <div class="icon icon-success"></div>
            申请中
        </div>
        <div class="available" v-else>
            <div class="header">
                <p class="title">申请成为代理商</p>
                <p class="desc">需要您填写真实姓名并验证手机</p>
            </div>
            <div class="form">
                <div class="tr">
                    <label for="">代理级别</label>
                    <input type="text" placeholder="县级" disabled>
                    <span class="tip">目前仅开放县级代理申请</span>
                </div>
                <div class="tr">
                    <label for="">选择地区</label>
                    <span class="chooseArea" @click="showAddress = !showAddress" v-if="!districtInfo">请选择地区</span>
                    <span class="area" @click="showAddress = !showAddress">{{districtInfo}}</span>
                    <!-- div.class -->
                </div>
                <div class="tr">
                    <label for="">姓名</label>
                    <input type="text" placeholder="请输入真实姓名" v-model="name">
                </div>
                <div class="tr">
                    <label for="">手机号</label>
                    <input type="text" placeholder="请输入手机号" v-model="mobile">
                    <span class="getCode" :class="{'waiting':waiting}" @click="getCode">{{getCodeTxt}}</span>
                </div>
                <div class="tr">
                    <label for="">验证码</label>
                    <input type="text" placeholder="请输入验证码" v-model="code">
                </div>
            </div>
            <div class="submit" @click="submit">提交申请</div>
            <x-address style="display: none;" title="请选择地区" v-model="district" raw-value :list="areaList" :show.sync="showAddress"></x-address>
        </div>
    </div>
</template>
<script>
import { XAddress} from 'vux'
import {ApplyMixin} from '@/common/js/mixin'
import Qs from 'qs'
export default {
  mixins: [ApplyMixin],
  data() {
    return {

    }
  },
  components: {
    XAddress
  },
  methods: {
    // 申请代理商
    submit() {
        let params = {
            district: this.district[this.district.length-1], 
            name: this.name,
            mobile: this.mobile,
            code: this.code
        }
        this.$axios.post('/agent/apply', Qs.stringify(params)).then(res => {
            if (res.status === 0) {
                this.$vux.toast.show({
                    text: res.info,
                    type: 'warn'
                })
            } else if (res.status === 1) {
                this.$vux.toast.show({
                    text: '申请提交成功',
                    type: 'success'
                })
                this.$router.go(-1)
            }
        })
    }
  },
  mounted() {
    this.getAddress()
  }
}
</script>
<style lang="stylus" scoped>
  #app
    height initial
    .applyFirst-wrapper
        padding-bottom 10px
        .disable
            .bgimg
                width 100%
                display block
            .desc-container
                margin 10px 15px
                background #fff
                padding 13px 15px
                border-radius 8px
            .desc
                color #769FFA
                font-size 12px
                text-align center
                line-height 20px
        .available
            .header
                background url('../../common/images/blue.png') no-repeat center
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
                    input,
                    .chooseArea
                        flex 1
                        color #b2b2b2
                        font-size 12px
                        outline none
                    .area
                        flex 1
                        color #4a4a4a
                        font-size 12px
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
                    .waiting
                        color #b2b2b2


    .submit
        color #fff
        height:45px
        background linear-gradient(360deg,rgba(112,156,253,1) 0%,rgba(93,191,254,1) 100%)
        box-shadow 0px 4px 7px 0px rgba(65,108,202,0.3)
        border-radius 8px
        text-align center
        line-height 45px
        margin 20px 15px 0
</style>