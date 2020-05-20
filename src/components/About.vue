<template>
  <div class="hello">
    <el-row>
      <el-col>
      <br/>
      <center>
        <a href="#/">
       <img src="../../static/icon.png" style="heigh:auto;width:25%;"/>
       </a>
       <h1>About {{ siteName }}</h1>

      <p>{{ siteName }} is the project of a single individual, Canin Carlos a.k.a. <a href="https://www.cultureclap.com" target="_blank">Culture Clap</a>.</p>

      <p><a href="https://www.cultureclap.com" target="_blank"><img src="../../static/profile3.jpg" style="width: 100%;"/></a></p>

      <p>I learned to code for the sole purpose of wanting to build this project.</p>

      <p>To have an application whereby each morning I wake, I can know what my elected officials are up to.</p>

      <p>Big shout-out to <a href="https://wwww.openstate.org" target="_blank">OpenStates</a> for laying the groundwork!!</p>

      <p>If you dig the idea too, and would like to support my work, I encourage you to <a href="https://www.patreon.com/bePatron?u=6465397">become a Patron</a> and support monthly for as little as <b>$1 per month</b> ...</p>

      <p>
        <a class="patreon-btn" href="https://www.patreon.com/bePatron?u=6465397">
          <img src="../../static/become_a_patron_button.jpg"/>
        </a>
      </p>
      <p>... or maybe just buy me a coffee as a one-time thank you :)</p>
      <p>
        <a class="bmc-button" target="_blank" href="https://www.buymeacoffee.com/cultureclap"><img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a coffee"><span>Buy me a coffee</span></a>
      </p>

      <br/>
      <h1>Data Policy</h1>
        <div>
          <p>I'm pretty strict about the following:</p>

          <p>People, including myself, don't want our data tracked and sold.</p>

          <p>Yea, this site is free to use; but our users <i>will never</i> be the product.</p>

          <p>Right now, I'm just measuring growth by Patreon support</p>

          <p>All of the code used to run this project is available on <a href="https://www.github.com/screamfreely" target="_blank">GitHub</a> as well.</p>

          <p>You can stay up-to-date with the project by subscribing to the newsletter:</p>

          <iframe src="https://screamfreely.substack.com/embed" width="345" height="300" style="border:0px solid #EEE; background:white;" frameborder="0" scrolling="no"></iframe>

          <p>I try to write updates every few weeks, and discuss my ideas for the project.</p>

        </div>

        <br/>
      <h1>Contact Me</h1>
          <p>The best way to contact me is through <a href="https://www.instagram.com/cultureclap" target="_blank">Instagram</a>.</p>

          <p>As I'm not on <a href="https://twitter.com/cultureclap" target="_blank">Twitter,</a> as much as I used to be.</p>

      </center>

      </el-col>
    </el-row>
  </div>    
</template>


 

<script>

import { mapState } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      checkedJuries: [],
      addJuris: false, 
    }
  },
  components: {
  },

  computed: mapState({
    stateName: state => state.posts.stateName,
    siteName: state => state.posts.siteName,
  }),
}
</script>



<style scoped>
.hello {
  height: 100px;
  border: 2px #fff solid;
  border-radius: 15px;
  padding: 5px;
  
}
.baseBorder {
    border: 4px #000 solid;
    border-radius: 4px;
    padding: 5px;
}
.auxRow {
#    margin-top: -25px;
    overflow: hidden;
}

.auxRow i{
  padding: 10px 10px 0px 10px;
}

.push-item {
    text-align: right;
    margin: -8px;
}
.el-col.mi {
    padding: 15px 5px 10px 5px;
}

h1, h2 {
  font-weight: normal;
  color: #000000; 
}

i {
  color: #ff5733;
}

a {
  color: #228170;
}

.patreon-btn img {
  border-radius: 10px;
}

.bmc-button img {
  height: 34px !important;
  width: 35px !important;
  margin-bottom: 1px !important;
  box-shadow: none !important;
  border: none !important;
  vertical-align: middle !important;
}

.bmc-button{
  padding: 7px 15px 7px 10px !important;
  line-height: 35px !important;
  height:51px !important;
  text-decoration: none !important;
  display:inline-flex !important;
  color:#FFFFFF !important;
  background-color:#FF813F !important;
  border-radius: 5px !important;
  border: 1px solid transparent !important;
  padding: 7px 15px 7px 10px !important;
  font-size: 22px !important;
  letter-spacing: 0.6px !important;
  box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5) !important;
  -webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;
  margin: 0 auto !important;
  font-family:'Cookie', cursive !important;
  -webkit-box-sizing: border-box !important;
  box-sizing: border-box !important;
}

.bmc-button span {
  margin-left:5px;font-size:28px !important;
}

.bmc-button:hover, .bmc-button:active, .bmc-button:focus {
  -webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;
  text-decoration: none !important;
  box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;
  opacity: 0.85 !important;
  color:#FFFFFF !important;
}

</style>
