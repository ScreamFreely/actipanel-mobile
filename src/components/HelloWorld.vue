<template>
  <div class="event_main">
	<h1>MnActivist</h1>
	<h3><a href="/about">About</a></h3>

<el-select v-model="calendar">
  <el-option v-for="cal in cals" :key="cal.key" :label="cal.label" :value="cal.label"></el-option>
</el-select>
<br />
<el-button type="primary" v-on:click="getCal(calendar)">MnA</el-button>


<div v-for="e in events" >
     <div justify="center">
          <h2>{{e.name}}</h2>
        </div>
     <div justify="center">
	<div class="">
	  <b>{{e.start_date | moment("dddd")}} {{e.start_date | moment("MMM D h:mma")}}</b>
	  <br />
	  <b>{{ e.location.name }} {{ e.jurisdiction.name }}</b>
        </div>	  
     </div>
     </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'Events',
  data () {
    return {
      msg: 'Events',
      next: '',
      count: '',      
      events: [],
      calendar: '',
      cals: [{ 'key': 'Minneapolis', 'label': 'Minneapolis'}, {'key': 'Saint-Paul', 'label': 'Saint Paul'}, {'key': 'Minnesota', 'label': 'Minnesota'}],
    }
  },
  methods: {
  getMore: function(next){
      this.$http.get(next)
      .then(function(response){
        console.log(response);
	this.events = this.events.concat(response.data.results);
	this.next = response.data.next.replace('http', 'https');	
      });
    },
   getCal: function(cal){
       console.log('Running ', cal)
       var link = 'https://api.mnactivist.org/api/pics/' + cal;
       this.$http.get(link)
       .then(function(response){
         this.events = response.data.results;
      });
    },
  },
  created: function(){
      console.log('created ran');
      this.$http.get('https://api.mnactivist.org/api/events')
//      this.$http.get('http://localhost:8000/api/events')
      .then(function(response){
	this.events = response.data.results;
	this.next = response.data.next.replace('http', 'https');		
	this.count = response.data.count;		
      });
  }
}
</script>


<style scoped>
h1, h2 {
  font-weight: normal;
  color: #42b983;	
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
  color: #42b983;
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
