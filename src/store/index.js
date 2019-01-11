import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userInfo: {}
}

const SAVE_USERINFO = 'SAVE_USERINFO'

const mutations = {
  [SAVE_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
    console.log(state.userInfo)
  }
}

const getters = {
  userInfo: state => state.userInfo
}

const actions = {
  saveUserInfo({commit}, userInfo) {
    commit(SAVE_USERINFO, userInfo)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})