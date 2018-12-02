import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import cart from './modules/cart'
// import createLogger from '../../../src/plugins/logger'


import user from './modules/user'
import auth from './modules/auth'
import posts from './modules/posts'
import events from './modules/events'
import policy from './modules/policy'
import people from './modules/people'
import orgs from './modules/orgs'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    auth,
    posts,
    events,
    people,
    policy,
    orgs
  },
  // state: {
    
  //   jwt: localStorage.getItem('t'),
  //   token: localStorage.getItem('user-token') || '',
  //   status: '',
  //   endpoints: {
  //     obtainJWT: 'http://localhost:8000/auth/obtaintoken/',
  //     refreshJWT: 'http://localhost:8000/auth/refreshtoken/'
  //   },
    
  // },

  // getters: {
  //   isAuthenticated: state => !!state.token,
  //   authStatus: state => state.status, 
  // },
  
  // mutations: {
  //   updateToken(state, newToken){
  //     localStorage.setItem('t', newToken);
  //     state.jwt = newToken;
  //   },
  //   removeToken(state){
  //     localStorage.removeItem('t');
  //     state.jwt = null;
  //   }
  // },

  // actions:{
  // obtainToken({ commit }, payload){
  //   console.log('new paylod', payload)
  //   axios.post(this.state.endpoints.obtainJWT, payload)
  //     .then((response)=>{
  //         console.log(response.data.token)
  //         this.commit('updateToken', response.data.token);
  //       })
  //     .catch((error)=>{
  //         console.log(error);
  //       })
  // },
  // refreshToken(){
  //   const payload = {
  //     token: this.state.jwt
  //   }
  //   axios.post(this.state.endpoints.refreshJWT, payload)
  //     .then((response)=>{
  //         this.commit('updateToken', response.data.token)
  //       })
  //     .catch((error)=>{
  //         console.log(error)
  //       })
  // },
  // inspectToken(){
  //     const token = this.state.jwt;
  //     if(token){
  //       const decoded = jwt_decode(token);
  //       const exp = decoded.exp
  //       const orig_iat = decode.orig_iat
  //       if(exp - (Date.now()/1000) < 1800 && (Date.now()/1000) - orig_iat < 628200){
  //         this.dispatch('refreshToken')
  //       } else if (exp -(Date.now()/1000) < 1800){
  //         // DO NOTHING, DO NOT REFRESH          
  //       } else {
  //         // PROMPT USER TO RE-LOGIN, THIS ELSE CLAUSE COVERS THE CONDITION WHERE A TOKEN IS EXPIRED AS WELL
  //       }
  //     }
  //   }
  // }
})