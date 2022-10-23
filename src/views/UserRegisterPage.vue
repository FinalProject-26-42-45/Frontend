<template>
  <div class="h-screen overflow-y-auto bg-coral2 fontNoto">
    <base-navbar></base-navbar>
    <div class="flex flex-col items-center h-full justify-center px-4 sm:px-0 ">
      <div class="flex rounded-3xl drop-shadow-xl w-full lg:w-2/3 h-auto bg-white sm:mx-0 ">
        
        <div class="flex flex-col justify-center w-full my-3">
          <div class="flex flex-col">
              <div class="flex justify-center mt-3">
                <img src="../assets/logo.png" class="object-cover h-16 w-auto" />
              </div>
              <div class="">
                <p class="text-lg text-center font-semibold">ลงทะเบียน</p>
                <p class="text-base text-center font-medium">เพื่อเข้าถึงฟีเจอร์มากมาย</p>
              </div>
              
          </div>
          <div class="flex justify-center">
            <img src="../assets/line.png" class="object-cover h-1 w-44" />
          </div>
          <div class="flex flex-row justify-center items-center ">
            <form @submit.prevent="signUp(firstname, lastname, username, password, birth, religion, foodAllergens, dislikedFood)" class="form-horizontal w-3/4 mx-auto p-2">
              <div v-if="!successful" class="flex flex-row space-x-4">
                <div class="w-1/2">
                  <div class="flex flex-col mt-1">
                    <p class="text-sm text-left font-medium ">ชื่อจริง</p>
                    <input v-model="firstname" id="firstname" type="text" class="flex-grow h-10 px-2 border rounded border-grey-400 bg-gray-200" name="firstname"  required >
                  </div>

                  <div class="flex flex-col mt-1">
                    <p class="text-sm text-left font-medium ">นามสกุล</p>
                    <input v-model="lastname" id="lastname" type="text" class="flex-grow h-10 px-2 rounded border border-grey-400 bg-gray-200" name="lastname"  required >
                  </div>

                  <div class="flex flex-col mt-1">
                    <p class="text-sm text-left font-medium ">วัน/เดือน/ปีเกิด</p>
                    <input v-model="birth" id="birthday" type="Date" max="3000-01-01" onfocus="this.max=new Date().toISOString().split('T')[0]" 
                        class="flex-grow h-10 px-2 rounded border border-grey-400 bg-gray-200" name="birthday" required >
                  </div>

                  <div class="flex flex-col mt-1">
                    <p class="text-sm text-left font-medium ">ศาสนา</p>
                    <select v-model="religion" id="religion" class="flex-grow h-10 px-2 border rounded border-grey-400 bg-gray-200" name="religion">
                      <option disabled value="">เลือกศาสนา</option>
                      <option>พุทธ</option>
                      <option>คริสต์</option>
                      <option>อิสลาม</option>
                      <option>ไม่นับถือศาสนา</option>
                    </select>
                  </div>
                 
                  <div class="flex flex-col mt-1">
                    <p class="text-sm text-left font-medium ">ชื่อผู้ใช้งาน</p>
                    <input v-model="username" id="username" type="text" class="flex-grow h-10 px-2 rounded border border-grey-400 bg-gray-200" name="username"  required >
                  </div>

                  <div class="flex flex-col mt-1">  
                    <p class="text-sm text-left font-medium ">รหัสผ่าน</p>
                    <input v-model="password" id="password" type="password" @input="checkPassword" class="flex-grow  h-10 px-2 border rounded border-grey-400 bg-gray-200" name="password"  required>
                    <div> 
                      <p class="frmValidation" :class="{ 'frmValidation--passed': inputMinimum }">
                        <!--<i :class="inputMinimum ? 'has_required' : '' "></i>-->ความยาว 8 ตัวอักษรขึ้นไป</p>
                      <p class="frmValidation" :class="{ 'frmValidation--passed': inputUpperCase }">
                        <!--<i :class="inputUpperCase ? 'has_required' : '' "></i>-->อักษร A-Z</p>
                      <p class="frmValidation" :class="{ 'frmValidation--passed': inputNumber }">
                        <!--<i :class="inputNumber ? has_required : '' "></i>-->ตัวเลข 0-9</p>
                      <p class="frmValidation" :class="{ 'frmValidation--passed': inputSpecial }">
                        <!--<i :class="inputSpecial ? 'has_required' : '' "></i>-->อักษรพิเศษ ! @ # % ^ & * ) ( + = . _ -</p>
                    </div>  
                  </div> 
                      
                </div>
                <div class="w-1/2">
                  <div class="flex flex-col mt-1"> 
                    <p class="text-sm text-left font-medium ">อาหารที่แพ้</p>
                      <VueMultiselect 
                        v-model="foodAllergens"
                        :multiple="true"
                        :options="foodAllergens"
                        :taggable="true"
                        @tag="addTagFoodAllergens"
                        placeholder="เช่น ไข่ นม ถั่ว"
                        class=""
                    />
                  </div>
                  <div class="flex flex-col mt-16"> 
                    <p class="text-sm text-left font-medium ">อาหารที่ไม่ชอบทาน</p>
                      <VueMultiselect 
                        v-model="dislikedFood"
                        :multiple="true"
                        :options="dislikedFood"
                        :taggable="true"
                        @tag="addTagDislikedFood"
                        placeholder="เช่น ไข่ นม ถั่ว"
                      />
                  </div>
                </div>
              </div>
              <div class="flex justify-center mt-2">
                <button type="submit" class="bg-yellow hover:bg-coral1 text-black hover:text-white text-sm font-semibold py-2 px-4 h-10 w-3/4 rounded">
                  ลงทะเบียน
                </button>
              </div>
            </form>
          </div>
        </div>  
      </div>
    </div>
  </div>
</template>

<script>
import VueMultiselect from 'vue-multiselect';
export default {
  components: { 
    VueMultiselect
   },
  data() {
      return {
        categoryName: [],
        firstname: "",
        lastname: "",
        birth: null,
        username: "",
        password: "",
        religion: "",
        foodAllergens: [],
        dislikedFood: [],
        successful: false,
        loading: false,
        message: "",
        inputNumber: false,
        inputUpperCase: false,
        inputSpecial: false,
        inputMinimum: false,
        
      };
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
      checkPassword: function () {
        this.inputMinimum = (this.password.length > 8)
        this.inputNumber = /\d/.test(this.password);
        this.inputUpperCase = /[A-Z]/.test(this.password);
        this.inputSpecial = /[!@#%^&*)(+=._-]/.test(this.password);
      },
      signUp(firstname, lastname, username, password, birth, religion, foodAllergens, dislikedFood) {
          const users = {firstname:firstname, lastname:lastname, birth:birth, username:username, 
          password:password, religion:religion, foodAllergens: foodAllergens, dislikedFood: dislikedFood}
          console.log(users);
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
      addTagFoodAllergens(newTagAller){
        this.foodAllergens.push(newTagAller);
      },
      addTagDislikedFood(newTagDisliked){
        this.dislikedFood.push(newTagDisliked);
      }

  },
  created() {

  },
}
</script>
<style >
  .fontKanit {
    font-family: 'Kanit', sans-serif;
    
  }
  .fontNoto {
    font-family: 'Noto Sans Thai', sans-serif;
  }
  .frmValidation {
    font-size: 0.7rem;
    line-height: 1rem;
    color: gray;
  }
  .frmValidation--passed {
    color: red;
  }
  .has_required {
    text-decoration: line-through;
    color: red;
  }
</style>
<style src="vue-multiselect/dist/vue-multiselect.css">
.e-multi-select-wrapper .e-chips {
    background-color: aqua;
    height: 26px;
}
</style>