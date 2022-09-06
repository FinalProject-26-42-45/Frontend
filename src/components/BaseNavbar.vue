<template>
    <div id="nav" class=" w-full flex items-center justify-between flex-wrap bg-yellow fontNoto">
      <div class="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2">
        <div class="flex items-center flex-shrink-0 text-gray-800 mr-16">
          <div class="flex flex-row">
            <router-link to="/">
              <img class="object-cover h-16 w-auto mt-1" alt="logo" src="../assets/logo.png" />
            </router-link>
            <p class="text-3xl font-bold text-white mt-5 ml-3 textShadow">FOODRAND</p>
          </div>
        </div>
      </div>
    
      <div class="menu w-full flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
        <div class="font-bold text-black text-base lg:flex-grow">
          <!-- <p
            class="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-coral1 mr-2">
            หน้าแรก
          </p> -->
          <!-- <router-link to="/">
            <p class="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-coral1 mr-2 pb-2">
              แนะนำอาหาร
            </p>
          </router-link> -->
          <!-- <p
            class="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-coral1 mr-2">
            บทความ
          </p> -->
          <!-- <p
            class="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-coral1 mr-2">
            สุ่มอาหาร
          </p> -->
        </div>
        
        <div v-if="!currentUser">
          <router-link to="/login-user">
            <div class="flex ">
              <font-awesome-icon icon="user-circle" class="block text-md rounded-full ml-2 h-10 w-10 bg-white border-2 border-white lg:mt-0" style="color:#F95335" />
      
              <button type="submit" class="block h-10 text-md px-2 ml-2 py-2 rounded-md text-white bg-coral1 hover:bg-coral2 lg:mt-0">
                เข้าสู่ระบบ
              </button>
            </div>
          </router-link> 
        </div>

        <div v-if="currentUser">
            <div class="flex ">
              <router-link to="/" >
                <div class="flex pr-3">
                  <font-awesome-icon icon="user-circle" class="block rounded-full ml-2 h-10 w-10 bg-white border-2 border-white lg:mt-0" style="color:#F95335" />
                  <p class="mt-2 pl-2 text-white text-base font-bold"> {{ currentUser.Username }} </p>
                </div>
              </router-link>
              <button type="submit" class="block h-10 text-md px-2 ml-2 py-2 rounded-md text-white bg-coral1 hover:bg-coral2 lg:mt-0" @click.prevent="logOut">
                <font-awesome-icon icon="sign-out-alt" class="mr-2"/>ออกจากระบบ
              </button>
            </div>
        </div>
      </div>    
        <slot></slot>
    </div>
    <router-view/>
</template>

<script>
export default {
  data(){
    return {
      logoutShow: false,
      loginShow: true,
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.users;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login-user');
      
    },
  }
};
</script>

<style>
  #nav {
    padding: 16px;
  }
  .fontKanit {
    font-family: 'Kanit', sans-serif;
    
  }
  .fontNoto {
    font-family: 'Noto Sans Thai', sans-serif;
  }
  .textShadow {
    text-shadow: 2px 2px 4px #2b2b2b;
  }
  .bgIcon {
    color: #F95335;
  }

</style>