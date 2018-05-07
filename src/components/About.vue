<template>
  <div class="event_main">
	<h1>MnActivist</h1>
	This is about the app.

</div>
</template>

<script>
export default {
  name: 'Events',
  data () {
    return {
      msg: 'Events',
    }
  },
  methods: {
    },
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
