<template>
  <div class="h-full fontNoto bg-gray1 overflow-x-hidden">
    <base-navbar></base-navbar>
    <section class="relative mx-auto">
      <nav class="flex justify-between bg-white text-black w-screen shadow-lg">
        <div class="px-5 py-6 flex w-full items-center">
          <ul class="md:flex px-4 mx-auto font-heading space-x-12">
            <router-link to="/user-recommend-menu">
              <div><a class="hover:text-coral1">แนะนำอาหาร</a></div>
            </router-link>
            <router-link to="/user-random">
              <div><a class="hover:text-coral1">สุ่มอาหาร</a></div>
            </router-link>
            <router-link to="/user-menu-history">
              <div>
                <a class="hover:text-coral1">ประวัติเมนูอาหารที่สุ่มได้</a>
              </div>
            </router-link>
            <router-link to="/user-profile">
              <div><a class="hover:text-coral1">บัญชีผู้ใช้</a></div>
            </router-link>
          </ul>
        </div>
      </nav>
    </section>
    <div class="flex justify-center text-left my-4">
      <div class="lg:w-2/4 rounded-xl bg-white shadow-lg p-2 my-8">
        <p class=" text-center text-lg my-4 font-semibold">ข้อมูลบัญชีผู้ใช้งาน</p>
        <div class="mb-2 md:flex md:justify-center">
          <div class="mb-4 md:mr-2 md:mb-0">
            <label class="block mb-1 text-sm text-gray-700" for="firstname">
              ชื่อจริง
            </label>
            <input
              class="
                w-56
                px-3
                py-2
                text-sm
                leading-tight
                text-gray-700
                bg-gray2
                border
                rounded
                shadow
                appearance-none
                focus:outline-none focus:shadow-outline
              "
              v-model="firstname"
              id="firstname"
              type="text"
              name="firstname"
              required
            >
          </div>
          <div class="md:ml-2">
            <label class="block mb-1 text-sm text-gray-700" for="lastname">
              นามสกุล
            </label>
            <input
              class="
                w-56
                px-3
                py-2
                text-sm
                leading-tight
                text-gray-700
                bg-gray2
                border
                rounded
                shadow
                appearance-none
                focus:outline-none focus:shadow-outline
              "
              v-model="lastname"
              id="lastname"
              type="text"
              name="lastname"
              required
            >
          </div>
        </div>

        <div class="mb-2 md:flex md:justify-center">
          <div class="mb-4 md:mr-2 md:mb-0">
            <label class="block mb-1 text-sm text-gray-700" for="tel">
              เบอร์โทรศัพท์
            </label>
            <input
              class="
                w-56
                px-3
                py-2
                text-sm
                leading-tight
                text-gray-700
                bg-gray2
                border
                rounded
                shadow
                appearance-none
                focus:outline-none focus:shadow-outline
              "
              v-model="tel"
              id="tel"
              type="text"
              name="tel"
              required
            >
          </div>
          <div class="md:ml-2">
            <label class="block mb-1 text-sm text-gray-700" for="gender">
              เพศ
            </label>
            <select
              class="
                w-56
                px-3
                py-2
                text-sm
                leading-tight
                text-gray-700
                bg-gray2
                border
                rounded
                shadow
                appearance-none
                focus:outline-none focus:shadow-outline
              "
              v-model="gender"
              id="gender"
              name="gender"
            >
              <option disabled value="">เลือกเพศ</option>
              <option>หญิง</option>
              <option>ชาย</option>
            </select>
          </div>
        </div>

        <div class="mb-4 md:flex md:justify-center">
          <div class="mb-4 md:mr-2 md:mb-0">
            <label class="block mb-1 text-sm text-gray-700" for="religion">
              ศาสนา
            </label>
            <input
              class="
                w-56
                px-3
                py-2
                text-sm
                leading-tight
                text-gray-700
                bg-gray2
                border
                rounded
                shadow
                appearance-none
                focus:outline-none focus:shadow-outline
              "
              v-model="religion"
              id="religion"
              type="text"
              name="religion"
              required
            >
          </div>
          <div class="md:ml-2">
            <label class="block mb-1 text-sm text-gray-700" for="foodallergens">
              อาหารที่แพ้
            </label>
            <input
              class="
                w-56
                px-3
                py-2
                text-sm
                leading-tight
                text-gray-700
                bg-gray2
                border
                rounded
                shadow
                appearance-none
                focus:outline-none focus:shadow-outline
              "
              v-model="foodallergens"
              id="foodallergens"
              type="text"
              name="foodallergens"
              required
            >
          </div>
        </div>

        <div class="text-center">
          <button
            class="
              w-auto
              px-4
              py-2
              mb-2
              font-bold
              rounded-lg
              bg-yellow
              hover:bg-coral1
              text-black
              hover:text-white
              focus:outline-none focus:shadow-outline
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
export default {
  components: {},
  data() {
    return {
      user: [],
      firstname: "",
      lastname: "",
      gender: "",
      tel: "",
      religion: "",
      foodallergens: "",
      userId: null,
      edited: null,
    };
  },
  methods: {
    retrieveUser() {
      MenuService.get(`/users`, {
        headers: {
          Authorization: authHeader().Authorization,
        },
      }).then((response) => {
        for (let i in response.data) {
          (this.userId = response.data[i].UserId),
            (this.firstname = response.data[i].Firstname),
            (this.lastname = response.data[i].Lastname),
            (this.gender = response.data[i].Gender),
            (this.tel = response.data[i].Tel),
            (this.religion = response.data[i].Religion),
            (this.foodallergens = response.data[i].FoodAllergens);
        }
      });
    },
    updateProfile() {
      const formData = new FormData();
      let edit = {
        UserId: this.userId,
        Firstname: this.firstname,
        Lastname: this.lastname,
        Gender: this.gender,
        Tel: this.tel,
        Religion: this.religion,
        FoodAllergens: this.foodallergens,
      };
      const userData = JSON.stringify(edit);
      const blob = new Blob([userData], {
        type: "application/json",
      });
      formData.append("json", blob);
      MenuService.put(`/users`, formData, {
        headers: {
          Authorization: authHeader().Authorization,
          "Content-Type": "multipart/form-data",
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