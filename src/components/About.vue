<template>
  <div class="hello">
    <el-row :gutter="20" :offset="2">
      <img src="../../static/banner.jpg" style="heigh:auto;width:100%;"/>
      <el-col :span="22" :offset="1">
      <h2>About {{ siteName }}</h2>
      <p>We are  aiming to be a one-stop apolitical shop for political information in {{ stateName }}, starting with event listings. We are just starting out; we've got an idea, proof of concept, and we'd love your support! Either through a follow or a donation to help increase public access to our government.</p>

      <center>
        <span><el-button type='primary' @click="donate()">Donate</el-button></span>
      </center>
      
      <p>We are also looking to teach and train new coders to expand and maintain our database. Using an organizational structure anchored by co-directors of differing racial and gender identies, we seek to maintain an open organizational culture that allows individuals space for the their experiences. We feel that this is a sector ripe to provide such opportunities to both grow our communities and our work-force.</p>
      </el-col>
 
      <center>
        <a v-if="isAuth == ''"  href="#/altmain">
              <img src="../../static/icon.png" style="heigh:auto;width:25%;"/>
        </a>
        <a v-if="isAuth != ''" href="#/main">
              <img src="../../static/icon.png" style="heigh:auto;width:25%;"/>
        </a>
      </center>

    </el-row> 
  </div>


    
</template>


<script>

import {AUTH_LOGOUT} from '../store/actions/auth'
import {AUTH_REQUEST} from '../store/actions/auth'
import {USER_PROFILE, DIFF_JURIS} from '../store/actions/user'
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import axios from 'axios';

export default {
  data () {
    return {
      checkedJuries: [],
      addJuris: false,   
    }
  },
  components: {
  },
  created: function(){
      console.log('created ran')
      this.$store.dispatch(USER_PROFILE, this.screenname)
      this.$store.dispatch(DIFF_JURIS, this.screenname)
      this.$store.dispatch('events/getJurisdictions')  
      
  },

  computed: mapState({
    icon: state => state.posts.icon,
    banner: state => state.posts.banner,
    stateName: state => state.posts.stateName,
    siteName: state => state.posts.siteName,
    isAuth: state => state.auth.token,
    screenname: state => state.user.username,
    juridiff: state => state.user.diffedjuris,
    profile: state => state.user.profile
  }),

  methods: {
    donate: function(){
      location.assign('https://mnactivist.org/donate')
    }

  },
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

</style>
