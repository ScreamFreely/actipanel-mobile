<template>
  <div class="event_main">
     <div class="overlay" v-show="overlay">
      <center>
        <a href="#/main#"  @click="overlay = !overlay">
          <img src="../../static/icon.png" style="heigh:auto;width:50%;"/>
        </a>
        <br/>
        <!--
        <h3><a href="#/profile">Profile</a></h3>
        <h3><a href="#/about">People</a></h3>
        <h3><a href="#/about">Organizations</a></h3>
        <h3><a href="#/about">Policies</a></h3>
        -->
        <h3><a href="#/about">About</a></h3>
        <h3><a href="#/" @click="logout">Logout</a></h3>
      </center>
    </div>

  <el-row :gutter="24" type="flex" class="row-bg">
    <el-col :span="18" :offset="1" justify="left" style="padding-top:10px;">
        <h3>Welcome {{ screenname }}</h3>
        <h4>
            <a href="#/main#" v-on:click='addEvent = !addEvent' style="padding:10px;">+ Event</a>
            <a href="#/main#" v-on:click='addComment = !addComment'> + Comment</el-button>
        </h4>
      <br/>
    </el-col>
    <el-col :span="7" :offset="0" justify="center">
      <a href="#/main#"  @click="overlay = !overlay">
        <img src="../../static/icon.png" style="heigh:auto;width:100%;"/>
      </a>
    </el-col>
  </el-row>

  <div v-if="addComment == true" >
  <center><h3>Send a Comment</h3></center>
  <el-row :gutter="24" type="flex" class="row-bg">

      <el-col :span="22" :offset="1" justify="center">
      <el-form ref="newComment" :model="newComment" label-width="20px">
  
  <el-form-item label=" ">
    <el-select v-model="newComment.comment_type" placeholder="Comment Type">
        <el-option
        v-for="item in coptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
    </el-select>
  </el-form-item>
  
  <el-form-item label=" ">
    <el-input placeholder="Email Address" v-model="newComment.email"></el-input>
  </el-form-item>
  
  <el-form-item label=" ">
    <el-input
      type="textarea"
        autosize
          placeholder="What's up?"
            v-model="newComment.description">
    </el-input>
  </el-form-item>

  <center>
    <el-button size="small" type='primary' @click="sendComment(newComment)">Submit Comment</el-button> 
    <el-button size="small" @click="addComment = !addComment" icon="el-icon-close"/>
  </center>
  
  </el-form>
  </el-col>
</el-row>

<br /><br/>
<center><h3>Send a Quote</h3></center>
  <el-row :gutter="24" type="flex" class="row-bg">

      <el-col :span="22" :offset="1" justify="center">
      <el-form ref="newQuote" :model="newQuote" label-width="20px">
  

  
  <el-form-item label=" ">
    <el-input
      type="textarea"
        autosize
          placeholder="Lay it on us ..."
            v-model="newQuote.quote">
    </el-input>
  </el-form-item>

    <el-form-item label=" ">
    <el-input placeholder="Author" v-model="newQuote.author"></el-input>
  </el-form-item>

    <el-form-item label=" ">
    <el-input placeholder="Link" v-model="newQuote.link"></el-input>
  </el-form-item>

  <center>
    <el-button size="small" size="small" type='primary' @click="sendQuote(newQuote)">Submit Quote</el-button>
    <el-button size="small" @click="addComment = !addComment" icon="el-icon-close"/>
  </center>
  
  </el-form>
  </el-col>
</el-row>
</div>


  
  <el-row v-if="addEvent == true" :gutter="24" type="flex" class="row-bg">
    <el-col :span="22" :offset="1" justify="center">

    <center>
 <p>Just have a Facebook Event?</p>

    <el-form ref="newFBEvent" :model="newFBEvent" label-width="20px">
      <el-form-item label=" " prop="name" required>
      <el-input placeholder="Facebook Event Link" v-model="newFBEvent.link"></el-input>
      </el-form-item>
    </el-form>

    <el-button type='primary' size='mini' @click="sendFBEvent(newFBEvent)">Submit Fb Event</el-button>

</center>
    <br/><br/>

      <el-form ref="newEvent" :model="newEvent" label-width="20px">

    <el-form-item label=" " prop="name" required>
    <el-input placeholder="Event Name" v-model="newEvent.name"></el-input>
    </el-form-item>

    <el-form-item label=" " required>
     <el-date-picker
          v-model="newEvent.date"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="Pick a day">
      </el-date-picker>
    </el-form-item>

    <el-form-item label=" " required>
      <el-time-select
        v-model="newEvent.time"
        :picker-options="{
          start: '06:30',
          step: '00:15',
          end: '23:30'
        }"
        value-format="HH:mm:ss"
        placeholder="Select time">
      </el-time-select>
  </el-form-item>
  
  <el-form-item label=" " required>
    <el-select v-model="newEvent.event_type" placeholder="Event Type">
        <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
    </el-select>
  </el-form-item>
  
  <el-form-item label=" " required>
    <el-input placeholder="Location, preferably an address" v-model="newEvent.location"></el-input>
  </el-form-item>
  
  <p>The following two fields will be used to match your event to others in the same city, or being hosted by the same organization(s). Separate mulitple participants with a comma.</p>
  
  <el-form-item label=" " required>
    <el-input placeholder="City" v-model="newEvent.city"></el-input>
  </el-form-item>
  
  <el-form-item label=" ">
    <el-input placeholder="Participants" v-model="newEvent.participants"></el-input>
  </el-form-item>
  
  <el-form-item label=" " required>
    <el-input placeholder="if none use 'sf.org'" v-model="newEvent.link">
        <template slot="prepend">http://</template>
          </el-input>
  </el-form-item>
  
  <el-form-item label=" " required>
    <el-input
      type="textarea"
        autosize
          placeholder="What's going on?"
            v-model="newEvent.description">
    </el-input>
  </el-form-item>
  
  <el-form-item label=" ">
    <el-input placeholder="Pass word" v-model="newEvent.password"></el-input>   
  </el-form-item>
 
  <center>
    <el-button type='primary' @click="sendEvent(newEvent)">Submit</el-button>
    <el-button @click="addEvent = !addEvent" icon="el-icon-close"/>
  </center>

  <br/><br/>
  </el-form>
  </el-col>
</el-row>

<div v-if="addEvent == false">
<center><span>

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




<el-row v-if="addEvent == false" v-for="x in events" :gutter="24" type="flex" class="row-bg" justify="center"> 

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
      newEvent: {},
      calendar: '',
      overlay: false, 
      screenname: localStorage.getItem('user-name'),   
      options: [{
          value: 'org',
          label: 'Organizational'
        }, {
          value: 'music',
          label: 'Music'
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
      ],
      coptions: [{
          value: 'sgn',
          label: 'Suggestion'
        }, {
          value: 'dbg',
          label: 'Tech Issue'
        }, {
          value: 'gte',
          label: 'Thank you'
        }, 
      ],
      num1: Math.floor((Math.random() * 50) + 1),
      num2: Math.floor((Math.random() * 10) + 1),
      harold: 0,
    }
  },
  methods: {
  handleChange(val) {
            console.log(val);
  },
  logout: function () {
    this.$store.dispatch(AUTH_LOGOUT)
    .then(() => {
     this.$router.push('#/')
      })
    },

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

    sendComment: function(data){
      axios.post('https://api.mnactivist.org/api/add-comment/', data,)
      .then(response => {
        this.newComment = {};
        this.addComment = false;
          this.$message({
            message: "Success! We got your comment, thank you.",
            type: 'success',
            duration: '5000',
          });
      })
      .catch(error => {
        console.log(error);
        this.$message({
          message: "All fields are required.",
          type: 'error',
          duration: '5000',
        });
      })
    },

    sendQuote: function(data){
        data.published = false;
        console.log(data);
        axios.post('https://api.mnactivist.org/api/add-quote/', data,)
        .then(response => {
          this.newQuote = {};
          this.addComment = false;
          this.$message({
            message: "Success! We got your quote, thank you!",
            type: 'success',
            duration: '5000',
          });
        })
            .catch(error => {
            console.log(error);
            this.$message({
            message: "Check required fields.",
            type: 'error',
            duration: '5000',
        });
        })
      },


    sendEvent: function(data){
      data.startdate = data.date + 'T' + data.time +':00+00:00';
      data.location = data.loc_name + ' |0| ' + data.location;
      if (data.link == '') { data.link = 'sf.org' };
      axios.post('https://api.mnactivist.org/api/add-event/', data,)
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
//        console.log(error);
        this.$message({
          message: "Check required fields.",
          type: 'error',
          duration: '5000',
        });
      })
    },
    
   getCal: function(cal){
        this.$store.dispatch('events/getCalendar', cal);
        this.calendar = '';
        mapState({
          events: state => state.events.events,
          });
          console.log('again cal list', this.callist)
    },

    sendFBEvent: function(data){
      var sdata = Object.assign( {}, data);
      if (sdata.link == '') { return };
      this.$store.dispatch('events/newFbEvent', sdata)
    },
  },
  
  created: function(){
      console.log('created ran', this.events);
      this.$store.dispatch('events/getCalendars')
      this.$store.dispatch('events/getUserEvents', localStorage.getItem('user-name'))
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
