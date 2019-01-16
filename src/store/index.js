import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs';

Vue.use(Vuex)

const state = {
  userInfo: {},
  cartLen: 0
}

const SAVE_USERINFO = 'SAVE_USERINFO'
const SET_CARTLEN = 'GET_CARTLEN'


const mutations = {
  [SAVE_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [SET_CARTLEN] (state, cartLen) {
    state.cartLen = cartLen
  }
}

const getters = {
  userInfo: state => state.userInfo,
  cartLen: state => state.cartLen
}

const actions = {
  saveUserInfo({commit}, userInfo) {
    commit(SAVE_USERINFO, userInfo)
  },
  saveCartLen({commit}, length) {
    commit(SET_CARTLEN, length)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})