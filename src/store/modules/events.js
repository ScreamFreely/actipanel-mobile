import Vue from 'vue'
import moment from 'moment'
import axios from 'axios'
// initial state
import api from '../api'
import _ from 'lodash'

const state = {
  all: [],
  callist: [],
  events: [],
  events_base: [],
  newEvent: {},
  newFBEvent: {},
  calendar:'',
  addEvent: false,
  cals: false,
  callist: [],
  next: '',
  count: '',
  jurisdictions: [],
  options: [
        {
          value: 'org',
          label: 'Organizational'
        }, {
          value: 'art',
          label: 'Arts & Music'
        }, {
          value: 'edu',
          label: 'Educational'
        }, {
          value: 'civ',
          label: 'Civic'
        }, {
          value: 'govt',
          label: 'Governmental'
        },
        {
          value: 'demo',
          label: 'Demonstration'
        },
  ],
}

// getters
const getters = {
  events: state => state.events.events,
  fbEvent: state => state.events.events,
  newEvent: state => state.events.newEvent,
  callist: state => state.events.callist,
  addEvent: state => state.events.addEvent,
  calendar: state => state.events.calendar,
  next: state => state.events.next,
  count: state => state.events.count,
  cals: state => state.events.cals,
}

// actions
const actions = {
  getCalendars ({ commit }) {
    axios.get(api.base + 'api/jurisdictions')
      .then((response)=>{
        console.log('juris ran', response)
        let cals = response.data.results
        this.commit('events/setCalendars', cals)
      })
  },
  getJurisdictions ({ commit }) {
    axios.get(api.base + 'api/jurisdictions')
      .then((response)=>{
        console.log('juris ran', response)
        let cals = response.data.results
        this.commit('events/setJurisdictions', cals)
      })
  },
  getCalendar ({commit }, cal) {
    if (cal == 'All Events'){
           var link = 'https://api.mnactivist.org/api/events';
       } else if (cal == 'Arts & Music'){
            var link = 'https://api.mnactivist.org/api/pics/art';
       } else if (cal == 'Civic'){
            var link = 'https://api.mnactivist.org/api/pics/civ';
       } else if (cal == 'Educative'){
            var link = 'https://api.mnactivist.org/api/pics/edu';
       } else if (cal == 'Org Events'){
            var link = 'https://api.mnactivist.org/api/pics/org';
       } else if (cal == 'Demonstrations'){
            var link = 'https://api.mnactivist.org/api/pics/demo';
       } else {
        cal = cal.replace(' ', '-');
        var link = 'https://api.mnactivist.org/api/pics/' + cal;
       }
      axios.get(link)
      .then((response) => {
        console.log(response)
        this.commit('events/setEvents', response.data.results)
        this.commit('events/setNext', response.data.next.replace('http', 'https'))
      })
  },
  getEvents ({ commit }) {
    axios.get(api.base + 'api/events')
      .then((response)=>{
        this.commit('events/setEvents', response.data.results)
        this.commit('events/setNext', response.data.next.replace('http', 'https'))
      })
  },
  getMoreEvents ({ commit }, data) {
    console.log(data)
    axios.get(data.next)
      .then((response)=>{
        console.log('again', data)
        let events = {
          'events': response.data.results,
          'pos': data.pos
        }
        this.commit('events/addEvents', events, data.pos)
        this.commit('events/setNext', response.data.next.replace('http', 'https'))
      })
  },
  getUserEvents ({ commit }, user) {
    axios.get(api.base + 'api/userevents/' + user)
      .then((response)=>{
        let results = response.data.results
        this.commit('events/setBaseEvents', results)
        this.commit('events/setEvents', results)
        this.commit('events/setNext', response.data.next.replace('http', 'https'))
      })
  },
  getNewEvents({ commit }, link) {
    axios.get(link)
      .then((response) => {
        console.log('received new events', response.data.results)
        let events = response.data.results
        let nlink = response.data.next.replace('http', 'https')
        this.commit('events/addEvents', events)
      })
  },

  newEvent ({ commit }, event) {
    axios.post(api.base + 'api/add-event/', event)
      .then(response => {
      this.newEvent = {};
      this.addEvent = false;
      this.$message({
        message: "Success! We got your event, thank you.",
        type: 'success',
        duration: '5000',
        });
      })
      .catch(error => {
        this.$message({
          message: "Check required fields.",
          type: 'error',
          duration: '5000',
       });
    })
  },


  newFbEvent ({ commit }, event) {
    axios.post(api.base + 'api/add-fb-event', event)
      .then(response => {
        this.newFBEvent = {};
        this.addEvent = false;
        this.$message({
          message: "Success! We got your event, thank you.",
          type: 'success',
          duration: '5000',
        });
      })
      .catch(error => {
        this.$message({
          message: "Check required fields.",
          type: 'error',
          duration: '5000',
        });
      })
  },
}

// mutations
const mutations = {
  setCalendars(state, calendars){
    // calendars.push({'id': 'null', 'name': 'Arts & Music'}, {'id': 'null', 'name': 'Civic'}, {'id': 'null', 'name': 'Demonstrations'}, {'id': 'null', 'name': 'Educative'}, {'id': 'null', 'name': 'Org Events'}, {'id': 'null', 'name': 'All Events'} )
    calendars.push({'id': 'null', 'name': 'All Events'} )
    state.callist = calendars
  },
  setJurisdictions(state, calendars){
    console.log('jeus riis', calendars)
    state.jurisdictions = calendars
  },
  setEvents(state, events){
    let nevents = _.groupBy(events, (result) => moment(result['start_date']).startOf('day'))
    state.events = nevents
  },
  setBaseEvents(state, events){
    state.base_events = events
  },
  setNext(state, next){
    console.log('got next', next)
    state.next = next
  },
  addEvents(state, data){
    console.log('new new', data)
    let events = state.base_events
    console.log(events)
    let nevents = events.concat(data.events)
    Vue.set(state, 'base_events', nevents)
    let fevents = _.groupBy(nevents, (result) => moment(result['start_date']).startOf('day'))
    Vue.set(state, 'events', fevents)
    location.assign('#/main')
    window.scrollTo(0, data.pos);
    // state.events = state.events.push(newEvents)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}