<template>
  <div class="hello">
    <el-row :gutter="20" :offset="2">
      <img src="../../static/banner.jpg" style="heigh:auto;width:100%;" v-if="isAuth == ''"/>
    </el-row> 
       <el-row class="auxRow":gutter="20" :offset="2" v-if="!SignUp">
           <el-col style="text-align: right;">
              <div style="padding-top:10px;">
                <span  v-if="isAuth != ''" style="text-align: right;margin: 0px 20px 0px 20px;"><b><a href="#" @click="logout">Logout</a></b></span>
                <div><center>
                  <el-form :inline="false" class="" v-if="isAuth == ''" >
                    <el-form-item>
                      <el-input size="large" required v-model="username" type="text" placeholder="Username"/>
                    </el-form-item>
                    <el-form-item>
                      <el-input size="large" required v-model="password" type="password" placeholder="Password"/>
                    </el-form-item>
                    <el-form-item>
                      <el-button size="large" type="submit" @click="login(username, password)">Login</el-button>
                    </el-form-item>
                  </el-form>
                  <el-button @click="SignUp = !SignUp">Sign Up</el-button>
                  <br/><br/>
                  <a href="#/altmain">I don't want an account</a>
                </center></div>
            </div>
          </el-col>
      </el-row>


      <div class="signup" v-if="SignUp">
       <el-row class="SignUpRow":gutter="20" :offset="2">
           <el-col style="text-align: right;">
              <div style="padding-top:10px;">
                <span  v-if="isAuth != ''" style="text-align: right;margin: 0px 20px 0px 20px;"><b><a href="#" @click="logout">Logout</a></b></span>
                <div><center>
                  <el-form :inline="false" class="" v-if="isAuth == ''" >
                    <el-form-item>
                      <el-input size="large" required v-model="username" type="text" placeholder=" New Username"/>
                    </el-form-item>
                    <el-form-item>
                      <el-input size="large" required v-model="password" type="password" placeholder="New Password"/>
                    </el-form-item>

                    <el-form-item>
                      <el-input size="large" required v-model="password2" type="password" placeholder="Confirm Password"/>
                    </el-form-item>

                    <el-checkbox-group v-model="checkedJuries">
                      <el-checkbox v-for="juri in juris" :label="juri.id" :key="juri.id">{{juri.name}}</el-checkbox>
                    </el-checkbox-group>
                    <br/><br/>

                    <el-form-item>
                      <el-button size="large" type="submit" @click="signup(username, password, password2, checkedJuries)">Sign Up</el-button>
                    </el-form-item>
                  </el-form>
                  <a @click="SignUp = !SignUp">I have an account</a>
                </center></div>
            </div>
          </el-col>
      </el-row>
    </div>


    </div>


    
</template>


<script>

import {AUTH_LOGOUT} from '../store/actions/auth'
import {AUTH_REQUEST} from '../store/actions/auth'
import {USER_SIGNUP} from '../store/actions/user'
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import axios from 'axios';

export default {
  data () {
    return {
      username: '',
      password: '', 
      SignUp: false,
      checkedJuries: [],    
    }
  },
  components: {
  },
  created: function(){
      console.log('created ran')
      this.$store.dispatch('events/getJurisdictions') 
      if (this.isAuth != '') {
        window.location.replace('#/main#')
      }  
  },

  computed: mapState({
     isAuth: state => state.auth.token,
     screenname: state => state.user.username,
     juris: state => state.events.jurisdictions,
     banner: state => state.posts.banner,
  }),

  methods: {
    login: function (u,p) {
       const { username, password } = this
       this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
        mapState({screenname: state => state.user.username,})
        this.password = ''
       })
       .catch((err) => {
       console.log(err)
        this.password = ''
       })
     },

     signup: function (u,p, p2, j) {
        const data  = {
          'username': u,
          'password': p,
          'jurisdictions': j, 
          'this': this
         }
         if (p === p2) {
         this.$store.dispatch(USER_SIGNUP, data).then((response) => {
            console.log('responssss', response)
            mapState({screenname: state => state.user.username,})
            this.password = ''
            this.password2 = ''
            this.username = ''
         }).catch((err) => {
            console.log('error', err)
            this.username = ''
          })
      } else { 
        console.log("Passwords Don't Match")
        this.password = ''
        this.password2 = ''
        this.$message({
        message: "Passwords do not match.",
        type: 'error',
        duration: '5000',
        });
      }
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
