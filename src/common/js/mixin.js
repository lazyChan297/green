import { mapGetters } from "vuex";
import { Value2nameFilter as value2name } from 'vux'
import {validPhone} from '@/common/js/validated'
import Qs from 'qs'
export const ApplyMixin = {
    data() {
        return {
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
    computed: {
        // 地区
        districtInfo: {
            get() {
              return this.areaDetail(this.district)
            },
            set() {
                return ''
            }
        },
        ...mapGetters([
            'userInfo'
        ])
    },
    methods: {
        // 获取地区信息
        getAddress() {
            this.$axios.get('/agent/forApplication').then(res => {
              if (res.status === 1) {
                this.areaList = res.data.districts
              }
            })
        },
        // 格式化地区
        areaDetail(value) {
            this.addressArr = (value2name(value, this.areaList)).split(' ')
            return value2name(value, this.areaList)
        },
        // 获取验证码
        getCode() {
            if (this.waiting) {
                return
            }
            let valid = validPhone(this.mobile)
            if (!valid) {
                return
            }
            // 修改绑定手机发送第一次验证码
            let params = Qs.stringify({mobile: this.mobile, type: 7})
            this.$axios.post('/users/sendSMS', params).then((res) => {
                // 发送成功
                if (res.status == 1) {
                    let reset = 10
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
        }
    }
}