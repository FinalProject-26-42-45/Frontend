<template>
  <div class="h-screen overflow-y-hidden bg-yellow fontNoto">
    <div class="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
      <div class="flex rounded-3xl drop-shadow-xl w-full lg:w-2/3 bg-white sm:mx-0" style="height: 500px">
        <div class="hidden md:block md:w-2/3">
          <img src="../assets/pic-login.png" class="rounded-l-3xl h-full">
        </div>
        
        <div class="flex flex-col w-full md:w-1/2 p-4">
          <div class="flex flex-col flex-1 justify-center items-center mb-8">
            <div class="flex justify-center">
              <img src="../assets/logo.png" class="object-cover h-16 w-auto" />
            </div>
            <div class="grid grid-cols-1">
                <p class="text-2xl text-center font-semibold">เข้าสู่ระบบผู้ดูแล</p>
                <img src="../assets/line.png" class="object-cover h-1 w-48 mt-1" />
            </div>
            <div class="w-full mt-12">
              <form class="form-horizontal w-3/4 mx-auto" @submit.prevent="signIn(username,password)">
                <div class="flex flex-col mt-2">
                  <p class="text-base text-left font-medium ">ชื่อผู้ใช้งาน</p>
                  <input v-model="username" id="username" type="text" class="flex-grow h-8 px-2 border rounded border-grey-400 bg-gray-200" name="username" required>
                </div>
                <div class="flex flex-col mt-2">
                  <p class="text-base text-left font-medium ">รหัสผ่าน</p>
                  <input v-model="password" id="password" type="password" class="flex-grow h-8 px-2 rounded border border-grey-400 bg-gray-200" name="password" required>
                </div>
                  <div class="flex flex-col mt-8">
                    <button type="submit" class="bg-yellow hover:bg-coral1 text-black hover:text-white text-sm font-semibold py-2 px-4 rounded" :disabled="loading">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      username: "",
      password: "",
      loading: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
      if (this.loggedIn) {
          this.$router.push('/admin-manage');
      }
  },
  methods: {
      signIn(username,password) {
          const users = {username:username,password:password}
          this.loading = true;
          this.$store.dispatch("auth/login", users).then(
              () => {
                  this.$router.push('/admin-manage');
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
  .fontKanit {
    font-family: 'Kanit', sans-serif;
    
  }
  .fontNoto {
    font-family: 'Noto Sans Thai', sans-serif;
  }

</style>