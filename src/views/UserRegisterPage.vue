<template>
  <div class="h-screen overflow-y-auto bg-coral2 fontNoto pb-24">
    <base-navbar></base-navbar>
    <div class="flex flex-col items-center h-full justify-center px-4 sm:px-0 ">
      <div class="flex rounded-3xl drop-shadow-xl w-full lg:w-2/3 h-auto overflow-auto bg-white sm:mx-0 sm:mt-12">
        
        <div class="flex flex-col justify-center w-full mb-3">
          <div class="flex flex-col justify-center items-center lg:-ml-32 md:-ml-28">
            <div class="lg:ml-32 md:ml-32 sm:mt-56 md:mt-0">
              <div class=" flex justify-center mt-3">
                <img src="../assets/logo.png" class="object-cover h-16 w-auto" />
              </div>
                <div class="">
                  <p class="text-lg text-center font-semibold">ลงทะเบียน</p>
                  <p class="text-base text-center font-medium">เพื่อเข้าถึงฟีเจอร์มากมาย</p>
                </div>
              <hr class="my-1 border-2 border-yellow dark:bg-yellow w-60" />
            </div>
              <div class="w-auto">
                <form @submit.prevent="signUp(firstname,lastname,email,tel,username,password, gender, birth, religion, foodallergens)" class="form-horizontal w-3/4 mx-auto p-2">
                  <div v-if="!successful">
                    <div class="flex lg:flex-row lg:space-x-3 md:flex-row sm:flex-col md:space-x-2">
                      <div class="flex flex-col mt-1">
                        <p class="text-sm text-left font-medium ">ชื่อจริง</p>
                        <input v-model="firstname" id="firstname" type="text" class="flex-grow h-7 px-2 border rounded border-grey-400 bg-gray-200" name="firstname"  required >
                      </div>
                      <div class="flex flex-col mt-1">
                        <p class="text-sm text-left font-medium ">นามสกุล</p>
                        <input v-model="lastname" id="lastname" type="text" class="flex-grow h-7 px-2 rounded border border-grey-400 bg-gray-200" name="lastname"  required >
                      </div>
                    </div>

                    <div class="flex lg:flex-row lg:space-x-3 md:flex-row sm:flex-col md:space-x-2">
                      <div class="flex flex-col mt-1">
                        <p class="text-sm text-left font-medium ">อีเมล์</p>
                        <input v-model="email" id="email" type="email" class="flex-grow h-7 px-2 border rounded border-grey-400 bg-gray-200" name="email"  required >
                      </div>
                      <div class="flex flex-col mt-1">
                        <p class="text-sm text-left font-medium ">เบอร์โทรศัพท์</p>
                        <input v-model="tel" id="tel" type="text" class="flex-grow h-7 px-2 border rounded border-grey-400 bg-gray-200" name="tel"  required>
                      </div>
                      
                    </div>

                    <div class="flex lg:flex-row lg:space-x-3 md:flex-row sm:flex-col md:space-x-2">
                      <div class="flex flex-col mt-1">
                        <p class="text-sm text-left font-medium ">ชื่อผู้ใช้งาน</p>
                        <input v-model="username" id="username" type="text" class="flex-grow h-7 px-2 rounded border border-grey-400 bg-gray-200" name="username"  required >
                      </div>
                      <div class="flex flex-col mt-1">
                        <p class="text-sm text-left font-medium ">รหัสผ่าน</p>
                        <input v-model="password" id="password" type="password" class="flex-grow h-7 px-2 border rounded border-grey-400 bg-gray-200" name="password"  required>
                      </div>        
                    </div>

                    <div class="flex lg:flex-row lg:space-x-3 md:flex-row sm:flex-col md:space-x-2">
                      <!-- <div class="flex flex-col mt-1">
                        <p class="text-sm text-left font-medium ">เพศ</p>
                        <input v-model="gender" id="gender" type="text" class="flex-grow h-7 px-2 border rounded border-grey-400 bg-gray-200" name="gender"  required >
                      </div> -->
                      <div class="flex flex-col mt-1">
                        <p class="text-sm text-left font-medium ">เพศ</p>
                        <select v-model="gender" class="flex-grow h-7 lg:w-52 px-2 border rounded border-grey-400 bg-gray-200" name="gender">
                          <option disabled value="">เลือกเพศ</option>
                          <option>หญิง</option>
                          <option>ชาย</option>
                        </select>
                      </div>
                      <div class="flex flex-col mt-1">
                        <p class="text-sm text-left font-medium ">วัน/เดือน/ปีเกิด</p>
                        <input v-model="birth" id="birthday" type="Date" max="3000-01-01" onfocus="this.max=new Date().toISOString().split('T')[0]" 
                        class="flex-grow h-7 lg:w-52 px-2 rounded border border-grey-400 bg-gray-200" name="birthday" required >
                      </div>
                    </div>

                    <div class="flex lg:flex-row lg:space-x-3 md:flex-row sm:flex-col md:space-x-2">                   
                      <div class="flex flex-col mt-1">
                        <p class="text-sm text-left font-medium ">ศาสนา</p>
                        <input v-model="religion" id="religion" type="text" class="flex-grow h-7 px-2 rounded border border-grey-400 bg-gray-200" name="religion"  required >
                      </div>
                      <div class="flex flex-col mt-1">
                        <p class="text-sm text-left font-medium ">อาหารที่แพ้</p>
                        <input v-model="foodallergens" id="foodallergens" type="text" class="flex-grow h-7 px-2 rounded border border-grey-400 bg-gray-200" name="foodallergens"  required >
                      </div>
                    </div>

                    <!-- <div class="flex flex-col mt-1">
                      <p class="text-sm text-left font-medium ">อาหารที่แพ้</p>
                      <div class="flex justify-start space-x-4">
                        <div>
                          <input type="checkbox" name="egg" id="egg" class="mr-1 "> 
                          <label for="egg" class="text-xs text-grey-dark ">ไข่</label>
                        </div>

                        <div>
                          <input type="checkbox" name="milk" id="milk" class="mr-1 "> 
                          <label for="milk" class="text-xs text-grey-dark ">นม</label>
                        </div>

                        <div>
                          <input type="checkbox" name="nut" id="nut" class="mr-1 "> 
                          <label for="nut" class="text-xs text-grey-dark ">ถั่ว</label>
                        </div>

                        <div>
                          <input type="checkbox" name="wheat" id="wheat" class="mr-1 "> 
                          <label for="wheat" class="text-xs text-grey-dark ">ข้าวสาลี</label>
                        </div>

                        <div>
                          <input type="checkbox" name="seafood" id="seafood" class="mr-1 "> 
                          <label for="seafood" class="text-xs text-grey-dark ">อาหารทะเล</label>
                        </div>

                        <div>
                          <input type="checkbox" name="fish" id="fish" class="mr-1 "> 
                          <label for="fish" class="text-xs text-grey-dark ">ปลา</label>
                        </div>
                      </div>
                      
                    </div> -->

                    <div class="flex flex-col lg:ml-32 md:ml-32 mt-2">
                      <button type="submit" class="bg-yellow hover:bg-coral1 text-black hover:text-white text-sm font-semibold py-2 px-4 rounded">
                        ลงทะเบียน
                      </button>
                    </div>
                  </div>
                </form>
              </div>
          </div>
        </div>

        <div class="sm:hidden md:block md:w-1/2 lg:w-2/3">
          <img src="../assets/pic-register.png" class="rounded-r-3xl h-full">
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  data() {
      return {
        firstname: "",
        lastname: "",
        birth: null,
        gender: "",
        email: "",
        tel: "",
        username: "",
        password: "",
        religion: "",
        foodallergens: "",
        successful: false,
        loading: false,
        message: ""
      }
  },

  computed: {
      loggedIn() {
          return this.$store.state.auth.status.loggedIn;
      },
  },
  mounted(){
      if (this.loggedIn) {
          this.$router.push('/login-user');
      }
  },

  methods: {
      signUp(firstname, lastname, email, tel, username, password, gender, birth, religion, foodallergens) {
          const users = {firstname:firstname, lastname:lastname, birth:birth, gender:gender, email:email, tel:tel, 
          username:username, password:password, religion:religion, foodallergens: foodallergens}
          this.message = "";
          this.successful = false;
          this.loading = true;
          this.$store.dispatch("auth/register", users).then(
              (data) => {
                  this.message = data.message;
                  this.successful = true;
                  this.loading = false;
                  alert("คุณลงทะเบียนเรียบร้อยแล้ว!")
                  this.$router.push('/login-user');
                  
              },
              (error) => {
                  this.message = 
                  (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                  error.message ||
                  error.toString();
                  this.successful = false;
                  this.loading = false;
              }
          );
      },
  }
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