import Vue from 'vue'
import {Toast} from 'vux'
export function validPhone(mobile) {
    let reg = /^1[345789][0-9]{9}$/
    if (!reg.test(mobile)) {
      Vue.$vux.toast.show({
        text: '请输入正确的手机号码',
        type: 'warn'
      })
      return false
    }
    return true
}
