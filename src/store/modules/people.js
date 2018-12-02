// import shop from '../../api/shop'
import axios from 'axios'
import api from '../api'

// initial state
const state = {
  all: [],
  people: [],

}

// getters
const getters = {
  // newPost: state => state.newPost,
  people: state => state.people.people,
}

// actions
const actions = {
  getPeople ({ commit }) {
    axios.get(api.base + 'api/people')
      .then((response)=>{
        this.commit('people/setPeople', response.data.results)
      })
    // console.log('got posts')
  },
}

// mutations
const mutations = {
  setPeople(state, people){
      state.people = people
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}