<template>
  <div class="event_main">
  <center><h3>Calendar of Events</h3>


  </center>
  <br/>
  
  <el-row v-if="addEvent == true" :gutter="24" type="flex" class="row-bg">
      <el-col :span="22" :offset="1" justify="center">
      <el-form ref="newEvent" :model="newEvent" label-width="20px">

    <el-form-item label=" " prop="name" required>
    <el-input placeholder="Event Name" v-model="newEvent.name"></el-input>
    </el-form-item>

    <el-form-item label=" " required>
         <el-date-picker
              v-model="newEvent.startdate"
        type="datetime"
        placeholder="Event date and time">
          </el-date-picker>
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
  <el-form-item label=" ">
  <span>
  {{ num1 }} + {{ num2 }} = <input placeholder="??" size="5" v-model="newEvent.numnum"></input>
  </span>
  </el-form-item>


  <el-button type='primary' @click="sendEvent(newEvent)">Submit</el-button>
  <el-button @click="addEvent = !addEvent" icon="el-icon-close"/>
  
  </el-form>
  </el-col>
</el-row>

<div v-if="addEvent == false">
<center><span>
<el-select v-model="calendar">
  <el-option v-for="cal in callist" :key="cal.name" :label="cal.name" :value="cal.name"></el-option>
</el-select>
<el-button v-on:click="getCal(calendar)" icon="el-icon-refresh"/>
</span>
<span>
<el-button v-on:click='addEvent = !addEvent' icon="el-icon-plus">Add Event</el-button>
<el-button v-on:click='addEvent = !addEvent' icon="el-icon-plus">Comment</el-button>
</span></center>


<el-row v-if="addEvent == false" v-for="e in events" :gutter="24" type="flex" class="row-bg" justify="center"> 
     <el-col :span="20" class="events">
    <el-row :span="18" type="flex" class="row-bg hidden-sm-and-down" justify="center">
        <el-col :span="12"> 
          <h2>{{e.name}}</h2>

    <a v-if="cals" href="https://calendar.google.com/calendar/r/eventedit?text=New+MnActivist+Event&dates=20180612T190000/20180612T190000&ctz=America/Chicago&details=You+can+add+a+link:+https://mnactivist.org">gCal</a>
    
        </el-col>
        <el-col :span="6" class="time">
    <b>{{e.start_date | moment("MMM D h:mma")}}</b>
    <br />
    <b class="push-day">{{e.start_date | moment("dddd")}}</b>
    <br />
    <b>{{ e.location.name }}</b>
    <br />
          <b>{{ e.jurisdiction.name }}</b>
        </el-col>   
     </el-row>
     <el-row :span="18" type="flex" class="row-bg hidden-md-and-up" justify="center">
          <h2>{{e.name}}</h2>
        </el-row>
     <el-row :span="18" type="flex" class="row-bg hidden-md-and-up" justify="center">   <el-col :span="18" class="">
    <b>{{e.start_date | moment("dddd")}} {{e.start_date | moment("MMM D h:mma")}}</b>
    <br />
    <b>{{ e.location.name }} {{ e.jurisdiction.name }}</b>
        </el-col>   
     </el-row>
     </el-col>
  </el-row>

  <el-row :gutter="24" v-if="next !== null" type="flex" class="row-bg" justify="center">
  {{this.events.length}}<h1><a href="#" v-on:click="getMore(next)" aria-label="Load more events"><i class="el-icon-arrow-down"></i></a></h1>{{count}}
  </el-row>
</div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Events',
  data () {
    return {
      msg: 'Events',
      addEvent: false,
      cals: false,
      callist: [],
      calendar:'',
      newEvent: {},
      next: '',
      count: '',      
      events: [],
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
      num1: Math.floor((Math.random() * 50) + 1),
      num2: Math.floor((Math.random() * 10) + 1),
      harold: 0,
    }
  },
  methods: {
  getMore: function(next){
      this.$http.get(next)
      .then(function(response){
//        console.log(response);
  this.events = this.events.concat(response.data.results);
  this.next = response.data.next.replace('http', 'https');  
      });
    },

  sendEvent: function(data){
      if (this.harold == data.numnum) {
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
      } else {
        this.$message({
    message: "Invalid answer.",
    type: 'error',
    duration: '5000',
    });
      }
    },
    
   getCal: function(cal){
       if (cal == 'All Events'){
  var link = 'https://api.mnactivist.org/api/events';
       } else {
        cal = cal.replace(' ', '-');
  console.log("this is cal: ", cal);
        var link = 'https://api.mnactivist.org/api/pics/' + cal;
       }
      axios.get(link)
      .then(response => (this.events = response.data.results))      
    },
  },
  
  created: function(){
      console.log('created ran', this.events);
      this.harold = this.num1 + this.num2;
      axios.get('https://api.mnactivist.org/api/events')
      .then(response => (this.events = response.data.results));
      axios.get('https://api.mnactivist.org/api/jurisdictions')
      .then(response => (this.callist = response.data.results, this.callist.push({'id': 'null', 'name': 'All Events'})));
  },
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
</style>
