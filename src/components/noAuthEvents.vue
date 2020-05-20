<template>
  <div class="event_main">
    <div>
    <br/>
      <center>
        <a href="#/about">
          <img src="../../static/icon.png"  style="heigh:auto;width:25%;"/>
        </a>
      </center>
      <br/>
    </div>

<div>
  <center>
    <span>
      <el-select v-model="calendar">
        <el-option v-for="cal in callist" :label="cal.name" :value="cal.name"></el-option>
      </el-select>
      <el-button v-on:click="getCal(calendar)" icon="el-icon-refresh"/>
    </span>
    <!--
    <span>
    <el-button v-on:click='addEvent = !addEvent' icon="el-icon-plus">Comment</el-button>
    </span>
    -->
  </center>

  <el-row v-for="x in events" :gutter="24" type="flex" class="row-bg" justify="center"> 
     <el-col  :span="24">
      <center><h2 v-for="e in x.slice(-1)">{{e.start_date | moment("dddd MMM D")}}</h2></center>

      <el-row v-for="e in x" :span="18" type="flex" class="row-bg hidden-sm-and-down events" justify="center">
          <el-col :span="12"> 
            <h2>{{e.name}}</h2>
            <a v-if="cals" href="https://calendar.google.com/calendar/r/eventedit?text=New+MnActivist+Event&dates=20180612T190000/20180612T190000&ctz=America/Chicago&details=You+can+add+a+link:+https://mnactivist.org">gCal</a>
            <b>{{e.start_date | moment("h:mma")}}</b>
          </el-col>
          <el-col :span="6" class="time">
            <b>{{ e.location.name }}</b>
            <br />
                  <b>{{ e.jurisdiction.name }}</b>
          </el-col>   
      </el-row>


      <el-row :span="24" type="flex" class="row-bg hidden-md-and-up" justify="center" style="margin:-10px 0px 10px 0px;">   
        <el-col :span="24" class="">
            <el-table
            :data="x"
            @row-click="rowClicked"
            :show-header="false"
            stripe
            style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                {{ scope.row.start_date| moment("h:mma")}}
                  <br/>
                  {{ scope.row.location.name }}
                  <br/> 
                  {{ scope.row.jurisdiction.name }}
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <span style="margin-left: 0px"><b>{{ scope.row.name }}</b></span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>   
      </el-row>

<!--
      <el-row v-for="e in x" :span="24" type="flex" class="row-bg hidden-md-and-up events" justify="center">   
        <el-col :span="24" class="">
        <h3>{{e.name}} {{e.start_date | moment("h:mma")}}</h3>
            <el-collapse @change="handleChange">
              <el-collapse-item>        
                <template slot="title">Support</template>
                  <b>{{ e.location.name }} {{ e.jurisdiction.name }}</b>
              </el-collapse-item>
            </el-collapse>
        </el-col>   
      </el-row>
-->
     </el-col>
  </el-row>

  <el-row :gutter="24" v-if="next !== null" type="flex" class="row-bg" justify="center" id="basetag">
  {{this.events.length}}<h1><a href="#" v-on:click="getMore(next)" aria-label="Load more events"><i class="el-icon-arrow-down"></i></a></h1>{{count}}
  </el-row>
</div>
</div>
</template>

<script>
import {AUTH_LOGOUT} from '../store/actions/auth'
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'

import axios from 'axios';

export default {
  name: 'Events',
  data () {
    return {
      msg: 'Events',
      addEvent: false,
      addComment: false,
      newComment: {},
      newQuote: {},
      calendar: '',
      overlay: false,    
    }
  },
  methods: {
    getMore: function(next){
        let rect = document.getElementById('basetag').offsetTop
        console.log(rect)
        const data = {
          'next': next,
          'pos': rect
        }
        this.$store.dispatch('events/getMoreEvents', data)
        mapState({
            events: state => state.events.events,
            });
      },
      
     getCal: function(cal){
          this.$store.dispatch('events/getCalendar', cal);
          this.calendar = '';
          mapState({
            events: state => state.events.events,
            });
            console.log('again cal list', this.callist)
      },
  },
  
  created: function(){
      console.log('created ran', this.events);
      this.$store.dispatch('events/getCalendars')
      this.$store.dispatch('events/getEvents')
  },

  computed: mapState({
  icon: state => state.posts.icon,
    banner: state => state.posts.banner,
    // isAuth: state => state.auth.token,
    events: state => state.events.events,
    callist: state => state.events.callist,
    newEvent: state => state.events.newEvent,
    newFBEvent: state => state.events.newFBEvent,
   // addEvent: state => state.events.addEvent,
   // calendar: state => state.events.calendar,
    cals: state => state.events.cals,
    next: state => state.events.next,
    count: state => state.events.count,
  }),
}
</script>


<style scoped>
h1, h2 {
  font-weight: normal;
  color: #2F835D; 
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #2F835D; 

}
.time {
  padding: 20px 5px 5px 5px;
  text-align: right;
}
.push-day {
  padding: 3px 0px 0px 15px;
}
.events {
  border: 2px #000 solid;
  border-radius: 25px;
  padding: 0px 5px 25px 5px;
  margin: 15px;
}

.overlay {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  z-index: 5;
}
</style>
