<template>
  <div class="h-screen overflow-y-hidden bg-coral2 fontNoto pb-24">
    <base-navbar></base-navbar>
    <div class="flex items-center flex-1 h-full justify-center px-4 sm:px-0 sm:py-4">
      <div class="flex rounded-3xl drop-shadow-xl w-full lg:w-2/3 bg-white sm:mx-0" style="height: 500px">
        <div class="hidden md:block md:w-2/3">
          <img src="../assets/pic-login.png" class="rounded-l-3xl h-full">
        </div>
        
        <div class="flex flex-col w-full md:w-1/2 p-4">
          <div class="flex flex-col flex-1 justify-center items-center mb-8">
            <div class="flex justify-center mt-3">
              <img src="../assets/logo.png" class="object-cover h-16 w-auto" />
            </div>
              <div class="mb-1">
                <p class="text-2xl text-center font-semibold">เข้าสู่ระบบ</p>
              </div>
              <hr class="my-2 border-2 border-yellow dark:bg-yellow w-48" />
              <div class="">
                <p class="text-base text-center font-medium mt-1">มีเมนูในใจแล้วหรือยัง?</p>
                <p class="text-base text-center font-medium ">มาค้นหาเมนูในใจของคุณกับ FOODRAND สิ่</p>
              </div>
            <div class="w-full mt-3">
              <form class="form-horizontal w-3/4 mx-auto" @submit.prevent="signIn(username,password)">
                <div class="flex flex-col mt-2">
                  <p class="text-base text-left font-medium ">ชื่อผู้ใช้งาน</p>
                  <input v-model="username" id="username" type="text" class="flex-grow h-10 px-2 border rounded border-grey-400 bg-gray-200" name="username" required >
                </div>
                
                <div class="flex flex-col mt-1" >   
                  <p class="text-base text-left font-medium mt-2">รหัสผ่าน</p> 
                  <div class="relative flex">          
                    <input v-model="password" id="password" :type="showPasswordField?'password':'text'" class="flex-grow h-10 px-2 rounded border border-grey-400 bg-gray-200" name="password" required >
                    <button class="block w-7 h-7 text-center text-xl leading-0 absolute top-1 right-2 text-gray-400 focus:outline-none hover:text-indigo-500 transition-colors" @click.prevent="showPasswordField=!showPasswordField"><i class="mdi" :class="`mdi-${showPasswordField?'eye-outline':'eye-off-outline'}`"></i></button> 
                  </div>
                </div>

                <!-- <div class="flex justify-between mt-2">
                  <div>
                    <input type="checkbox" name="remember" id="remember" class="mr-2 "> 
                    <label for="remember" class="text-sm text-grey-dark ">จดจำฉันไว้</label>
                  </div>
                  <div>
                    <p class="text-sm text-grey-dark ">ลืมรหัสผ่าน ?</p>
                  </div>
                </div> -->
                <div class="flex flex-col mt-4">
                  <button type="submit" class="bg-yellow hover:bg-coral1 text-black hover:text-white text-sm font-semibold py-2 px-4 h-10 rounded">
                    <span
                      v-show="loading"
                      class="spinner-border spinner-border-sm"
                    ></span>
                    เข้าสู่ระบบ
                  </button>
                </div>

                <div v-if="message" class="alert alert-danger" role="alert">
                  {{ message }}
                </div>
              </form>
              <div class="flex flex-row justify-center space-x-1 mt-4">
                <p class="text-xs">
                  ยังไม่มีบัญชีผู้ใช้? 
                </p>
                <p class="no-underline hover:underline text-coral1 text-xs"><router-link to="/user-register">สมัครที่นี่</router-link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import BaseNavbar from '@/components/BaseNavbar.vue'


export default {
  components: {
    // BaseNavbar

  },
  data() {
      return {
          username: "",
          password: "",
          loading: false,
          message: "",
          showPasswordField: true,
      };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
      if (this.loggedIn) {
          this.$router.push('/user-statistic-random-menu');
      }
  },
  methods: {
    signIn(username,password) {
      const users = {username:username,password:password}
      this.loading = true;
      this.$store.dispatch("auth/login", users).then(
        () => {
          this.$router.push('/user-statistic-random-menu');
        },
        (error) => {
          this.loading = false;
          this.message = 
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
}
</script>
<style>
@import url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);
  .fontKanit {
    font-family: 'Kanit', sans-serif;
    
  }
  .fontNoto {
    font-family: 'Noto Sans Thai', sans-serif;
  }

</style>