<template>
    <div class="deliveryDetail-wrapper">
        <p class="status">
            <span>状态</span>
            <span v-if="details.status===2">待发货</span>
            <span v-else-if="details.status===3">已发货</span>
            <span v-else="details.status===1">已完成</span>
        </p>
        <section class="order-content">
            <div class="goods" v-for="(goods,index) in details.goods">
                <img :src="goods.img" alt="" width="60" height="60">
                <div>
                    <p class="name">{{goods.name}}</p>
                    <p>
                        <span class="price">¥{{goods.price}}</span>
                        <span class="num">x{{goods.quantity}}</span>
                    </p>
                </div>
            </div>
            <div class="tr">
                <span>实付款</span>
                <span class="red">¥{{details.amount}}</span>
            </div>
            <div class="info">
                <p>
                    <span>收件人</span>
                    <span class="name">
                        <span>{{details.reciever}}</span>
                        <span class="mobile">{{details.mobile}}</span>
                    </span>
                </p>
                <p>
                    <span>收货地址</span>
                    <span>{{details.address}}</span>
                </p>
                <p>
                    <span>下单时间</span>
                    <span>{{details.orderCreatedAt}}</span>
                </p>
            </div>
            <div class="tr">
                <span>发货方式</span>
                <div class="radio">
                    <div class="radio-item">
                        <input type="radio" name="delivery" v-model="way" value="1">
                        <label for="">快递公司</label>
                    </div>
                    <div class="radio-item">
                        <input type="radio" name="delivery" v-model="way" value="2" id="delivery">
                        <label for="">送货上门</label>
                    </div>
                </div>
            </div>
            <div class="tr" @click="showPopupPicker = true" v-show="way==1">
                <span>快递公司</span>
                <span :class="{'unselected': expressCompany.length ==0}">{{companyText}}</span>
            </div>
            <div class="tr" v-show="way==1">
                <input type="number" placeholder="请输入物流单号" v-model="expressNo">
            </div>
        </section>
    <div class="submit" @click="toDelivery">立即发货</div>
    <!-- 物流公司选择框 -->
    <popup-picker ref="picker" @on-change="onChange" :data="exCompanys" :columns="columns" v-model="expressCompany" v-show="showPopupPicker" :show-cell="false" :show.sync="showPopupPicker"></popup-picker>
    </div>
</template>
<script>
import { Checker, CheckerItem, CheckIcon, PopupPicker } from 'vux'
import Qs from 'qs'
export default {
    data() {
        return {
            way: 1, //1快递寄出 2 送货上门
            showPopupPicker: false,
            columns: 1,
            expressCompany: [],
            companyText: '快递公司名称',
            exCompanys: [],
            details: {},
            expressNo: ''
        }
    },
    components: {
        Checker,
        CheckerItem,
        CheckIcon,
        PopupPicker
    },
    mounted() {
        this.getExpress()
        this.getDetails(this.$route.params.no)
    },
    methods: {
        onChange(e) {
            this.companyText = this.$refs.picker.getNameValues()
        },
        getDetails(no) {
            this.$axios.get('/supplier/details', {
                params: {
                    no: no
                }
            }).then(res => {
                if (res.status === 1) {
                    this.details = res.data
                }
            })
        },
        // 获取物流公司
        getExpress() {
            this.$axios.get('/supplier/expressCompany').then(res => {
                if (res.status === 1) {
                    let arr = []
					res.data.forEach((item,i) => {
						arr.push({ name: item.name, value: item.code })
					})
					this.exCompanys.push(arr)
                }
            })
        },
        toDelivery() {
            let params = Qs.stringify({orderNo: this.details.orderNo})
            if (this.way == 1) {
                if (!this.expressNo) {
                    this.$vux.toast.show({
                        text: '请输入快递单号',
                        type: 'warn'
                    })
                    return
                }
                if (!this.expressCompany[0]) {
                    this.$vux.toast.show({
                        text: '请选择快递公司',
                        type: 'warn'
                    })
                    return
                }
                params = Qs.stringify({expressNo: this.expressNo,company:this.expressCompany[0]})
            } 
            this.$axios.post('/supplier/expressNo', params).then(res => {
                if (res.status === 0) {
                    this.$vux.toast.show({
                        text: res.info,
                        type: 'warn'
                    })
                } else {
                    this.$vux.toast.show({
                        text: res.info,
                        type: 'success',
                        time: 500
                    })
                    let timer = setTimeout(() => {
                        this.$router.go(-1)
                    }, 1000)
                }
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
    .deliveryDetail-wrapper
        .status
            display flex
            justify-content space-between
            line-height 40px
            background #fff
            padding 0 15px
            margin-bottom 10px
            span
                font-size 14px
                &:first-child
                    color #4a4a4a
                &:last-child
                    color $green
        .order-content
            background #fff
            .goods
                display flex
                padding 10px 15px
                border-bottom 1px solid #e2e2e2
                &>div
                    flex 1
                    margin-left 10px
                    .name
                        color $black
                        margin-bottom 20px
                    .price,.num
                        color #b2b2b2
                        font-size 14px
                    &>div
                        display flex
                        justify-content space-between
            .tr
                display flex
                justify-content space-between
                height 45px
                line-height 45px
                border-bottom 1px solid #e2e2e2
                padding 0 15px
                align-items center
                &:last-child
                    border none
                &>span
                    font-size 14px
                    color $black 
                .red
                    color #FF6659
                    font-size 14px
                .green
                    color $green
                .unselected
                    color #b2b2b2
                .fh,.wl
                    width 90px
                    text-align center
                    line-height 30px
                    height 30px
                    border-radius 8px
                .fh
                    background linear-gradient(180deg,rgba(48,207,30,1) 0%,rgba(24,184,1,1) 100%)
                    color #fff
                .wl
                    border 1px solid #b2b2b2
                    color #b2b2b2
                input
                    outline none
                    font-size 14px
                    color #4a4a4a
                    border 1px solid #b2b2b2
                input::-webkit-input-placeholder
                    color #b2b2b2
            .info
                padding 10px 15px
                font-size 12px
                border-bottom 1px solid #e2e2e2
                p
                    display flex
                    &>span
                        line-height 17px
                        &:first-child
                            color #b2b2b2
                            width 60px
                        &:last-child
                            flex 1
                            color #4a4a4a
                    .name 
                        display flex
                        justify-content space-between
                    .mobile
                        color $green
            .radio
                display:flex
                flex: 1
                height: 100%
                margin-left 20px
                .radio-item
                    position: relative
                    flex: 1
                    text-align: left
                input
                    position:absolute
                    top: 50%;
                    transform: translateY(-50%);
                    width: 20px;
                    height: 20px;
                    opacity: 0
            label
                font-size 14px
                &:before
                    content:''
                    display:inline-block
                    vertical-align: sub
                    box-sizing: border-box
                    width:20px
                    height:20px
                    border-radius:50%
                    border:1px solid #9b9b9b
                    margin-right:7px
            input[type="radio"]:checked + label
                &:before
                    content:''
                    display:inline-block
                    vertical-align: middle
                    width:20px
                    height:20px
                    background-image:url('../../common/svg/radio.svg')
                    background-size: 100%
                    border: none
                    margin-right:7px
            .input-box
                padding: 7px 15px;
                background: #fff
            input
                height: 32px;
                border: 1px solid #9b9b9b;
                border-radius: 3px;
                width: 100%;
                padding-left: 6px
            input[type="radio"]:checked + label
                &:before
                    content:''
                    display:inline-block
                    vertical-align: sub
                    width:20px
                    height:20px
                    background-image:url('../../common/svg/radio.svg')
                    background-size: 100%
                    border: none
                    margin-right:7px
            .input-box
                padding: 7px 15px;
                background: #fff
            input
                height: 32px;
                border: 1px solid #9b9b9b;
                border-radius: 3px;
                width: 100%;
                padding-left: 6px
        .submit
            line-height 45px
            color #fff
            text-align center
            margin 10px 15px
            height 45px
            background linear-gradient(180deg,rgba(48,207,30,1) 0%,rgba(24,184,1,1) 100%)
            box-shadow 0px 4px 7px 0px rgba(30,137,19,0.3)
            border-radius 8px
</style>