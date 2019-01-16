<template>
    <div class="applySecond-wrapper">
        <!-- <div class="disable" v-if="userInfo.hasBought==0">
            <img src="../../common/images/shenqingdls.jpg" alt="" class="bgimg">
            <div class="desc-container">
                <p class="desc">对不起，您还未购买任何一款一县一品产品，不符合团长申请条件！请您先去购买。</p>
            </div>
            <div class="submit">去购买</div>
        </div> -->
        <div v-if="userInfo.distributorApplication == 0" class="waitingValid">
            <div class="icon icon-success"></div>
            <!-- <p>{{userInfo.distributorApplication}}</p> -->
            <p class="title">提交成功</br>请等待管理人员来审核</p>
        </div>
        <div class="available" v-else>
                <div class="header">
                    <p class="title">申请成为团长</p>
                    <p class="desc">需要您填写真实姓名并验证手机</p>
                </div>
                <div class="form">
                    <div class="tr">
                        <label for="">选择地区</label>
                        <span class="chooseArea" @click="showAddress = !showAddress" v-if="!districtInfo">请选择地区</span>
                    <span class="area" @click="showAddress = !showAddress">{{districtInfo}}</span>
                    </div>
                    <div class="tr">
                        <label for="">小区</label>
                        <input type="text" placeholder="请选择小区" v-model="community">
                    </div>
                    <div class="tr">
                        <label for="">姓名</label>
                        <input type="text" placeholder="请输入真实姓名" v-model="name">
                    </div>
                    <div class="tr">
                        <label for="">手机号</label>
                        <input type="number" placeholder="请输入手机号" v-model="mobile" class="mobile">
                        <span class="getCode" :class="{'waiting':waiting}" @click="getCode">{{getCodeTxt}}</span>
                    </div>
                    <div class="tr">
                        <label for="">验证码</label>
                        <input type="number" placeholder="请输入验证码" v-model="code">
                    </div>
                </div>
                <div class="submit" @click="submit">提交申请</div>
                <x-address style="display: none;" title="请选择地区" v-model="district" raw-value :list="areaList" :show.sync="showAddress"></x-address>
            </div>
    </div>
</template>
<script>
import { XAddress,
    Value2nameFilter as value2name } from 'vux'
import {validPhone} from '@/common/js/validated'
import Qs from 'qs'
import { mapGetters } from 'vuex'
import {ApplyMixin} from '@/common/js/mixin'
import "../../common/css/media.css"
export default {
  mixins: [ApplyMixin],
  data() {
    return {
      canIApply: true,
      showAddress: false,
      areaList: [],
      district: [],
      mobile: '',
      code: null,
      getCodeTxt: '获取验证码',
      waiting: false,
      name: '',
      community: ''
    }
  },
  components: {
    XAddress
  },
  mounted() {
    this.getAddress()
  },
  methods: {
    // 提交
    submit() {
        // {"district":,"community":"所在小区","name":"申请者姓名","mobile":手机号,"code":验证码}
        let params = {
            district: this.district[this.district.length-1], 
            community: this.community,
            name: this.name,
            mobile: this.mobile,
            code: this.code
        }
        this.$axios.post('/distributor/apply', Qs.stringify(params)).then(res => {
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
  }
}
</script>
<style lang="stylus" scoped>
    @import "../../common/stylus/variable.styl"
    #app
        height initial
    .applySecond-wrapper
        padding-bottom 10px
        .waitingValid
            padding-top 60px
            .title
                color $green
                font-size 18px
                text-align center
                line-height 28px
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
                color $green
                font-size 14px
                text-align center
                line-height 20px
        .available
            .header
                background url('../../common/images/green.jpg') no-repeat center
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
                        color #4a4a4a
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
        background linear-gradient(180deg,rgba(48,207,30,1) 0%,rgba(24,184,1,1) 100%)
        box-shadow 0px 4px 7px 0px rgba(30,137,19,0.3)
        border-radius 8px
        text-align center
        line-height 45px
        margin 20px 15px 0
</style>