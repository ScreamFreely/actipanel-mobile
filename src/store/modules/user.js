import { USER_REQUEST, USER_ERROR, USER_SUCCESS, USER_SIGNUP, USER_PROFILE, USER_PROFILE_SUCCESS, DIFF_JURIS, ORGS_DIFFED } from '../actions/user'
// import apiCall from '../../utils/api'
import api from '../api'
import Vue from 'vue'
import { AUTH_LOGOUT } from '../actions/auth'

import axios from 'axios'

const state = { 
  status: '', 
  profile: {},
  username: localStorage.getItem('user-name')
}

const getters = {
  getProfile: state => state.profile,
  getUsername: state => state.username,
  isProfileLoaded: state => !!state.profile.name,
}

const actions = {
  [USER_REQUEST]: ({commit, dispatch}, user) => {
    commit(USER_REQUEST)
    axios({url: api.base + 'api/user/' + user.username + '/', method: 'GET'})
      .then(resp => {
        console.log('user call', resp.data.results[0])
        const user = resp.data.results[0]
        localStorage.setItem('user-name', user.username)
        commit(USER_SUCCESS, user)
      })
      .catch(resp => {
        commit(USER_ERROR)
        // if resp is unauthorized, logout, to
        dispatch(AUTH_LOGOUT)
      })
  },
  [USER_SIGNUP]: ({commit, dispatch}, user) => {
    commit(USER_REQUEST)
    console.log(user)
    const nuser = {
      'username' : user.username,
      'password' : user.password,
    }
    axios({url: api.base + 'createuser/', method: 'POST', data: nuser})
      .then(resp => {
        console.log('user success', resp)
        console.log('user though', user)
        const nuser = resp.data
        localStorage.setItem('user-name', user.username)
        user.jurisdictions.forEach(function(juri){
          let juriuser = {
          'activist': resp.data.id,
          'jurisdiction': juri,
          'info_level': 0
          }
          axios({url: api.base + 'createjuriuser/', method: 'POST', data: juriuser})
        }) 
        commit(USER_SUCCESS, user)
      })
      .catch(resp => {
        commit(USER_ERROR)
        console.log(resp)

        user.this.$message({
              message: "Username not available.",
              type: 'error',
              duration: '5000',
            })
        // if resp is unauthorized, logout, to
        dispatch(AUTH_LOGOUT)
      })
  },
  [USER_PROFILE]: ({commit, dispatch}, user) => {
    commit(USER_REQUEST)
    axios({url: api.base + 'api/profile/' + user + '/', method: 'GET'})
      .then(resp => {
        console.log('user call', resp.data)
        const user = resp.data.results[0]
        commit(USER_PROFILE_SUCCESS, user)
      })
      .catch(resp => {
        commit(USER_ERROR)
        // if resp is unauthorized, logout, tolocation.assign('#/main#')locatlocation.assign('#/main#')location.assign('#/main#')ion.assign('#/main#')
        // dispatch(AUTH_LOGOUT)location.assign('#/main#')location.assign('#/main#')
      })
  },
  [DIFF_JURIS]: ({commit, dispatch}, user) => {
    axios({url: api.base + 'orgdiff/' + user + '/', method: 'GET'})
      .then(resp => {
        console.log('diff juris', resp.data)
        const user = resp.data.results
        commit(ORGS_DIFFED, user)
      })
      .catch(resp => {
        commit(USER_ERROR)
        // if resp is unauthorized, logout, to
        // dispatch(AUTH_LOGOUT)
      })
  },
}

const mutations = {
  [USER_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = 'success'
    Vue.set(state, 'profile', resp)
    // location.reload()
    location.assign('#/main#')
  },
  [USER_PROFILE_SUCCESS]: (state, resp) => {
    state.status = 'success'
    Vue.set(state, 'profile', resp)
    // location.reload()
    // location.assign('#/profile')
  },
  [ORGS_DIFFED]: (state, resp) => {
    Vue.set(state, 'diffedjuris', resp)
    // location.reload()
    // location.assign('#/profile')
  },
  [USER_ERROR]: (state) => {
    state.status = 'error'
  },
  [AUTH_LOGOUT]: (state) => {
    state.profile = {}
    state.username = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}