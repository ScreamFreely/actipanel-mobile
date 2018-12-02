// import shop from '../../api/shop'
import axios from 'axios'
import api from '../api'

// initial state
const state = {
  all: [],
  policies: [],

}

// getters
const getters = {
  newPost: state => state.newPost,
  policies: state => state.policy.policies,
}

// actions
const actions = {
  getPolicy ({ commit }) {
    axios.get(api.base + 'api/bills')
      .then((response)=>{
        this.commit('policy/setPolicies', response.data.results)
      })
    // console.log('got posts')
  },
}

// mutations
const mutations = {
  setPolicies(state, policies){
      state.policies = policies
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}