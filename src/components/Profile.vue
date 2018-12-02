<template>
  <div class="hello">
    <el-row :gutter="20" :offset="2">
      <img src="../../static/banner.jpg" style="heigh:auto;width:100%;"/>

      
      Welcome <b>{{ profile.username }}</b>

      <el-col :span="22" :offset="1">
        <p>
          Thank you so much for downloading our app, and joining us on the road to building more communicative communities. Immediately below is the all the information we'll be maintaining for your profile. If you'd like to submit your phone number and email address, organizations you choose to follow will be able to contact you, <em>if you let them</em>.
        </p>

        <span><br/><b>Email:</b> {{ profile.email }} <el-input v-if='!profile.email' size="small" required v-model="email" type="email" placeholder="text"/></span>
        <span><br/><b>Phone Number:</b> {{ profile.phone_number }}<el-input v-if='!profile.phone_number' size="small" required v-model="phone" type="numbers" placeholder="digits"/></span> 
        <br/><br/>
        <center><el-button v-if="!profile.phone_number | !profile.email" size="small" type="submit" @click="updateProfile(profile.username, phone, email)">Update</el-button></center>
      </el-col>
      

      <br/>

      <el-col :span="22" :offset="1">
        <p>
          Here is a list of the "jurisdictions" you are following. Events from these locales will populate your home feed. You can add others, from the app; and in future versions you will be able to remove jurisdictions as well ¯\_(ツ)_/¯`
        </p>
      </el-col>
      
      <b>Jurisdictions:</b>
      <br/><br/>
      <el-col :span="22" :offset="1">
        <span v-for=" j in profile.userjurisdictions_set">{{ j.jurisdiction.name}} <br/></span>
        <br/><br/>
        <a v-if="!addJuris" @click="addJuris = !addJuris">Add more</a>
        <el-form v-if="addJuris">
          Available:
          <el-col :span="22" :offset="1" style="padding:8px;">
          <el-checkbox-group v-model="checkedJuries">
              <el-checkbox v-for="juri in juridiff" :label="juri.id" :key="juri.id">{{juri.name}}</el-checkbox>
          </el-checkbox-group>
          </el-col>
          <center>
          <el-form-item>
            <el-button size="mini" type="submit" @click="addJurisFN(checkedJuries)">Add</el-button>
            <el-button size="mini" v-if="addJuris" @click="addJuris = !addJuris">X</el-button>
          </el-form-item>
          
          </center>
        </el-form>
      </el-col>
      <center>
    <a href="#/main">
          <img src="../../static/icon.png" style="heigh:auto;width:25%;"/>
    </a></center>

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
      this.$store.dispatch(USER_PROFILE, localStorage.getItem('user-name'))
      this.$store.dispatch(DIFF_JURIS, localStorage.getItem('user-name'))
      this.$store.dispatch('events/getJurisdictions')  
      
  },

  computed: mapState({
     isAuth: state => state.auth.token,
     screenname: state => state.user.username,
     juridiff: state => state.user.diffedjuris,
     profile: state => state.user.profile,
     icon: state => state.posts.icon,
    banner: state => state.posts.banner,
    stateName: state => state.posts.stateName,
    siteName: state => state.posts.siteName,
  }),

  methods: {
  updateProfile: function (u, p, e) {
      const data = {
        'username': u,
        'phone': '+1' + p,
        'email': e,
      }
      console.log(data)
       axios.post('https://api.mnactivist.org/updateuser/', data).then((resp) => {
        console.log(resp)
        location.reload()
       })
       .catch((err) => {
       console.log(err)
       })
     },

    addJurisFN: function (j) {
      const u = this.screenname
      j.forEach(function(juri){
       let juriuser = {
          'activist': u,
          'jurisdiction': juri,
          'info_level': 0
          }
          axios({url: 'https://api.mnactivist.org/createjuriuser/', method: 'POST', data: juriuser})
          .then((resp) => {
            console.log(resp)
            location.reload()
           })
      })
     },

    logout: function () {
    this.$store.dispatch(AUTH_LOGOUT)
    .then(() => {
     this.$router.push('#/about')
      })
    },
 
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
