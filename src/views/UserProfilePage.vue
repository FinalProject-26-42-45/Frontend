<template>
  <div class="h-full fontNoto bg-gray1 overflow-x-hidden">
    <base-navbar></base-navbar>
    <section class="relative mx-auto z-40">
        <nav class="flex justify-between bg-white text-black w-screen shadow-lg">
          <div class="px-5 py-6 flex w-full items-center">
            <ul class="md:flex px-4 mx-auto font-heading lg:space-x-12 md:space-x-12">
                <router-link to="/user-statistic-random-menu" class="flex flex-row hover:text-coral1 ">
                    <i class="material-icons">home</i>
                    <div><p class="sm:text-sm md:text-sm lg:text-lg">หน้าแรก</p></div>
                </router-link>
                <router-link to="/user-recommend-menu" class="flex flex-row hover:text-coral1">
                    <i class="material-icons">restaurant_menu</i>
                    <div><p class="sm:text-sm md:text-sm lg:text-lg">เมนูอาหาร</p></div>
                </router-link>
                <router-link to="/user-random" class="flex flex-row hover:text-coral1">
                    <i class="material-icons">attractions</i>
                    <div><p class="sm:text-sm md:text-sm lg:text-lg">สุ่มอาหาร</p></div>
                </router-link>
                <router-link to="/user-menu-history" class="flex flex-row hover:text-coral1">
                    <i class="material-icons">history</i>
                    <div><p class="sm:text-sm md:text-sm lg:text-lg">ประวัติเมนูอาหารที่สุ่มได้</p></div>
                </router-link>
                <router-link to="/user-profile" class="flex flex-row hover:text-coral1">
                    <i class="material-icons">manage_accounts</i>
                    <div><p class="sm:text-sm md:text-sm lg:text-lg">บัญชีผู้ใช้</p></div>
                </router-link>
                </ul>
          </div>
        </nav>
      </section>
    <div class="flex justify-center items-center text-left my-4">
      <div class="lg:w-2/4 w-full flex flex-col items-center rounded-xl bg-white shadow-lg p-2 my-8">
        <p class=" text-center text-xl my-4 font-semibold">ข้อมูลบัญชีผู้ใช้งาน</p>
          <div class="w-1/2 ">
            <label class="block mb-1 text-lg text-gray-700" for="firstname">
              ชื่อจริง
            </label>
            <input
              class="flex-grow h-10 w-full text-lg px-2 border rounded border-grey-400"
              v-model="firstname"
              id="firstname"
              type="text"
              name="firstname"
              required
            >
          </div>
          <div class="w-1/2 mt-2">
            <label class="block mb-1 text-lg text-gray-700" for="lastname">
              นามสกุล
            </label>
            <input
              class="flex-grow h-10 w-full text-lg px-2 border rounded border-grey-400"
              v-model="lastname"
              id="lastname"
              type="text"
              name="lastname"
              required
            >
          </div>

          <div class="w-1/2 mt-2">
            <label class="block mb-1 text-lg text-gray-700" for="religion">
              ศาสนา
            </label>
            <select v-model="religion" id="religion" class="flex-grow text-lg h-10 w-full px-2 border rounded border-grey-400" name="religion">
              <option disabled value="">เลือกศาสนา</option>
              <option>พุทธ</option>
              <option>คริสต์</option>
              <option>อิสลาม</option>
              <option>ไม่นับถือศาสนา</option>
            </select>
          </div>
          
          <div class="w-1/2 mt-2">
            <label class="block mb-1 text-lg text-gray-700" for="foodallergens">
              อาหารที่แพ้
            </label>
            <VueMultiselect 
                        v-model="foodallergens"
                        :multiple="true"
                        :options="foodallergens"
                        :taggable="true"
                        @tag="addTagFoodAllergens"
                        placeholder="เช่น ไข่ นม ถั่ว หรือถ้าไม่มีให้ใส่ -"
                      />
          </div>

          <div class="w-1/2 mt-2">
            <label class="block mb-1 text-lg text-gray-700" for="dislikedFood">
              อาหารที่ไม่ชอบทาน
            </label>
            <VueMultiselect 
                        v-model="dislikedFood"
                        :multiple="true"
                        :options="dislikedFood"
                        :taggable="true"
                        @tag="addTagDislikedFood"
                        placeholder="เช่น ไข่ นม ถั่ว หรือถ้าไม่มีให้ใส่ -"
                      />
          </div>
        <div class="text-center mt-2">
          <button
            class="
              w-auto
              px-4
              py-2
              my-2
              font-bold
              rounded-lg
              bg-yellow
              hover:bg-coral1
              text-black
              hover:text-white
              focus:outline-none focus:shadow-outline
              text-lg
            "
            type="button"
            @click="updateProfile()"
          >
            แก้ไขข้อมูล
          </button>
        </div>
      </div>
    </div>
    <base-footer></base-footer>
  </div>
</template>

<script>
import MenuService from "../service/MenuService";
import authHeader from "../service/AuthenHeader.js";
import VueMultiselect from 'vue-multiselect';
export default {
  components: {
    VueMultiselect
  },
  data() {
    return {
      user: [],
      firstname: "",
      lastname: "",
      religion: "",
      foodallergens: [],
      dislikedFood: [],
      userId: null,
      edited: null,
    };
  },
  methods: {
    retrieveUser() {
      MenuService.get(`/users/info`, {
        headers: {
          Authorization: authHeader().Authorization,
        },
      }).then((response) => {
        this.firstname = response.data.Firstname
        this.lastname = response.data.Lastname
        this.religion = response.data.Religion
        this.foodallergens = response.data.FoodAllergens
        this.dislikedFood = response.data.DislikedFood
      });
    },
    updateProfile() {
      let edit = {
        Firstname: this.firstname,
        Lastname: this.lastname,
        Religion: this.religion,
        FoodAllergens: this.foodallergens,
        DislikedFood: this.dislikedFood
      };
      MenuService.put(`/users`, edit, {
        headers: {
          Authorization: authHeader().Authorization,
        },
      }).then(response => {
                if(response.status === 200){
                    alert("แก้ไขข้อมูลเรียบร้อยแล้ว!")
                    this.$router.go()
                }
      }).catch(error => {
                if(error.status === 401){
                alert("ต้องเข้าสู่ระบบก่อนทำการแก้ไขข้อมูล!")
                this.$router.push('/login-user');
                }
      }) 
    },
    addTagFoodAllergens(newTagAller){
      this.foodallergens.push(newTagAller);
    },
    addTagDislikedFood(newTagDisliked){
      this.dislikedFood.push(newTagDisliked);
    }
  },
  created() {
    this.retrieveUser();
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.users;
    },
  },
};
</script>