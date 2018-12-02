// import shop from '../../api/shop'
import api from '../api'
import axios from 'axios'
// initial state
const state = {
  all: [],
  orgs: [],
  newOrg: {},
}

// getters
const getters = {
  newOrg: state => state.newOrg,
  orgs: state => state.orgs.orgs,
}

// actions
// const actions = {
//   getOrgs ({ commit }) {
//     axios.get(axios.get(api.base + 'api/organizations')
//       .then((response)=>{
//         this.commit('posts/setOrgs', response.data.results)
//     })
//   }
// } 

const actions = {
  getOrgs ({ commit }) {
    axios.get(api.base + 'api/organizations')
      .then((response)=>{
        console.log(response)
        let orgs = response.data.results
        this.commit('orgs/setOrgs', orgs)
      })
  },
}

// mutations
const mutations = {
  setOrgs(state, orgs){
    state.orgs = orgs
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}