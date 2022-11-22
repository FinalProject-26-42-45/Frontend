<template>
  <div class="h-full fontNoto bg-gray1 overflow-x-hidden">
    <base-navbar></base-navbar>
    <section class="relative mx-auto z-10">
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
    <div class="sm:hidden lg:inline md:inline">
        <div class=" bg-banner3 w-full bg-center bg-no-repeat bg-contain lg:-mt-32 lg:pt-2 md:-mt-60 md:pt-7">
              <div class="relative flex h-screen w-screen items-center justify-center container mx-auto px-8 ">
                  <div class="absolute inset-x-0 lg:bottom-60 md:bottom-80 text-center">
                      <p class="text-3xl lg:text-5xl md:text-2xl whitespace-pre-line mb-2 mt-12">สุ่มเมนูอาหาร</p>
                      <p class="text-3xl lg:text-lg md:text-sm whitespace-pre-line">ใครที่มีคำถามนี้ในใจเป็นประจำทุกวัน วันนี้ Foodrand มีเมนูอาหารมาแนะนำ</p>
                      <p class="text-3xl lg:text-lg md:text-sm whitespace-pre-line">ไม่ต้องคิดเองให้เสียเวลา ตามเรามาดูกันเลยว่ามีเมนูไหนให้เลือกบ้าง</p>
                  </div>
              </div>
        </div>
    </div>
    <div class="flex lg:flex-row sm:flex-col justify-center">
      <div class="lg:w-5/6 md:w-full sm:w-full py-10 bg-white p-3 flex lg:flex-row md:flex-row sm:flex-col justify-center lg:-mt-24 md:-mt-48 mb-10 lg:space-x-14 lg:space-y-0 md:space-x-12 md:space-y-0 sm:space-y-4 z-20">
        <div class="bg-yellow1 lg:w-2/6 py-4 px-4 pl-3 rounded-lg flex flex-col items-center">
            <p class="text-left font-medium lg:text-base sm:text-xs lg:-ml-48">เลือกประเภทอาหาร:</p>
            <div class="grid grid-cols-2 gap-x-4 gap-y-4 mt-2">
              <div class="flex">
                  <input type="checkbox" v-model="allSelected" @change="selectAll"
                    class="lg:w-5 lg:h-5 sm:w-4 sm:h-4 accent-coral1"
                  />
                  <p class="pl-1 lg:text-base sm:text-xs">เมนูทั้งหมด</p>
                </div>
              <div
                v-for="c in Category"
                :key="c.CategoryId"
                class="flex flex-row"
              >
                <input
                  type="checkbox"
                  id="category"
                  :value="c.CategoryId"
                  v-model="selectCategory"
                  name="category"
                  class="lg:w-5 lg:h-5 sm:w-4 sm:h-4 accent-coral1"
                />
                <p class="pl-1 lg:text-base sm:text-xs">{{ c.CategoryName }}</p>
              </div>
            </div>
            <div class="mt-3 flex justify-center">
              <button
                @click="clickCategory()"
                class="bg-green px-3 py-2 h-10 w-20 rounded-3xl font-semibold"
              >
                สุ่มเมนู
              </button>
            </div>
        </div> 
        <div class="relative bg-randomImg lg:w-3/6 lg:block sm:hidden md:hidden md:w-3/6 sm:w-full h-full bg-no-repeat bg-contain bg-center"> 
          <div v-if="showMenu" class="justify-center pl-44 -ml-2 mt-14">
            <img :src="imgSrc" class="object-cover h-auto w-44" /> 
          </div>
          <div v-if="showQuestion1" class="absolute inset-x-0 bottom-32 -ml-28 pl-1 flex flex-col justify-center">
              <p class="text-center text-sm">
                คุณต้องการเก็บประวัติผลการสุ่มเมนูหรือไม่
              </p>
              <div class="flex justify-center space-x-3 mt-2 mb-2">
                <button
                  @click="addMenuHistory()"
                  class="bg-green px-3 py-1 h-8 w-16 rounded-3xl font-semibold"
                >
                  ใช่
                </button>
                <button
                  @click="clickNo()"
                  class="
                    bg-red-500
                    px-3
                    py-1
                    h-8
                    w-16
                    rounded-3xl
                    font-semibold
                  "
                >
                  ไม่
                </button>
              </div>
          </div>

          <div v-if="showQuestion2" class="absolute inset-x-0 bottom-32 -ml-28 pl-2 flex lg:space-x-2 justify-center mt-2 mb-2"> 
                <button
                   @click="clickRecipe(randomMenu.MenuId)"
                  class="bg-yellow3 px-2 py-1 h-8 w-28 rounded-3xl font-semibold"
                >
                  ดูสูตรอาหาร
                </button>
                <button
                  @click="openGoogleMap()"
                  class="bg-coral2 px-2 py-1 h-8 w-28 rounded-3xl font-semibold"
                >
                  ดูร้านอาหาร
                </button>
            </div>
          <div v-if="showMenu" class="absolute inset-x-0 bottom-16 mb-2 -ml-12 text-center">
            <p class="font-medium text-lg">
                {{ randomMenu.Menuname }}
            </p>
          </div>
            
        </div>
        <div class="lg:hidden md:block bg-nood sm:w-full md:w-2/4 md:py-8 h-full pl-6 pt-6 pr-6 rounded-lg flex flex-col justify-center">
            <p class="text-center font-bold text-sm pb-2">เมนูที่คุณได้คือ...</p>
            <div v-if="showMenu">
              <div class="flex justify-center">
                <img :src="imgSrc" class="object-cover h-64 w-auto" />
              </div>
              <div class="flex justify-center mt-4">
                <input
                  type="text"
                  class="font-bold text-sm text-center rounded-md border-2 border-blue1 border-opacity-50y w-full px-3 py-2 mb-2"
                  v-model="randomMenu.Menuname"
                  disabled
                />
              </div>
              <div v-if="showQuestion1" class="mb-4 space-x-2">
                  <p class="text-center text-sm">
                    คุณต้องการเก็บประวัติผลการสุ่มเมนูหรือไม่
                  </p>
                  <div class="flex justify-center space-x-3 mt-2">
                    <button
                      @click="addMenuHistory()"
                      class="bg-green px-3 py-1 h-8 w-16 rounded-3xl font-semibold"
                    >
                      ใช่
                    </button>
                    <button
                      @click="clickNo()"
                      class="
                        bg-red-500
                        px-3
                        py-1
                        h-8
                        w-16
                        rounded-3xl
                        font-semibold
                      "
                    >
                      ไม่
                    </button>
                  </div>
              </div> 
              <div v-if="showQuestion2" class="mb-4 space-x-2 flex justify-center">
                <button
                  @click="clickRecipe(randomMenu.MenuId)"
                  class="bg-yellow3 px-2 py-1 h-8 w-28 rounded-3xl font-semibold text-sm"
                >
                  ดูสูตรอาหาร
                </button>
                <button
                  @click="openGoogleMap()"
                  class="bg-coral2 px-2 py-1 h-8 w-28 rounded-3xl font-semibold text-sm"
                >
                  ดูร้านอาหาร
                </button>
              </div>
            </div>
          </div>
      </div>
    </div>
    <div v-if="openRecipe" class="overflow-x-hidden overflow-y-hidden fixed inset-10 z-50 outline-none focus:outline-none flex justify-center items-center">
      <div class="h-full border-0 rounded-md shadow-lg flex flex-col lg:w-3/4 md:w-1/2 bg-white outline-none focus:outline-none overflow-auto">
              
        <div class="flex justify-end pr-3 pt-2">
          <button class="close text-black" type="button" @click="closeModal()" > X </button>
        </div>

        <div v-for="n in popupMenu" :key="n.MenuId" class=" bg-white rounded-md px-4 pb-4">
          <div class="pt-3 flex justify-center md:justify-center">
            <h3 class="text-3xl uppercase text-darkgray">{{ n.MenuName }}</h3>
          </div>
          <div class="lg:flex lg:flex-row justify-around mt-2 sm:flex sm:flex-col">
            <div class="lg:flex lg:justify-center sm:justify-center md:justify-center  w-3/4 rounded-md">
              <img class="object-cover w-auto lg:h-80" :src="getMenuImage( n.MenuImg )"/>
            </div>

        
        </div>   
            <div class="mt-6 ">
              <p class="text-xl font-semibold pl-4">วัตถุดิบ</p>
              <p class="text-lg whitespace-pre-line pl-8">{{ n.Ingredients }}</p>
            </div>           
            <div class="mt-6 ">
              <p class="text-xl font-semibold pl-4">วิธีการทำ</p>
              <p class="text-lg whitespace-pre-line pl-8">{{ n.Preparation }}</p>
            </div>
        </div>
            
      </div>
    </div>
    <div v-if="openRecipe" class="show-modal"></div>
    <base-footer></base-footer>
  </div>
</template>

<script>
import MenuService from "../service/MenuService.js";
import authHeader from "../service/AuthenHeader";

export default {
  components: {},
  data() {
    return {
      Category: [],
      menuInCategory: [],
      randomMenu: "",
      selectCategory: [],
      showMenu: false,
      imgSrc: "",
      allSelected: false,
      showQuestion1: false,
      showQuestion2: false,
      popupMenu: [],
      MenuId: null,
      showModal: false,
      openRecipe: false,
    };
  },
  methods: {
    toggleModal: function(){
      this.showModal = !this.showModal;
    },
    closeModal() {
      this.openRecipe = false;
    },
    clickRecipe(MenuId) {
      this.popupMenu = [];
      var mn = [];
      MenuService.get("/menu/"+MenuId)
      .then(res => {
        mn = res.data;
        this.popupMenu.push(mn);
      });
      // this.getRecipe(MenuId);
      this.openRecipe = true;
      this.addStatistic();
    },
    listCategory() {
      MenuService.get("/menucategory").then((response) => {
        this.Category = response.data;
      });
    },

    clickNo() {
      this.showQuestion1 = false;
      this.showQuestion2 = true;
    },
    openGoogleMap() {
        this.addStatistic();
        var search = this.randomMenu.Menuname;
        window.open(
          "https://www.google.co.th/maps/search/" + search
        );
    },
    selectAll() {       
        if (this.allSelected) {
          const selected = this.Category.map((c) => c.CategoryId);
          this.selectCategory = selected;
        } else {
          this.selectCategory = [];

        }
    },
    clickCategory() {
      let data = {
        CategoryIdList: this.selectCategory,
      };
      MenuService.post("/menu/categorylist", data, {
        headers: {
          Authorization: authHeader().Authorization,
        },
      })
      .then((response) => {
          for (let each in response.data) {
            this.menuInCategory.push({
              MenuId: response.data[each].MenuId,
              Menuname: response.data[each].MenuName,
              MenuImg: response.data[each].MenuImg,
            });
          }
          var random = Math.floor(Math.random() * this.menuInCategory.length);
          this.randomMenu = this.menuInCategory[random];
          //  this.imgSrc = `http://localhost:3000/images/${this.randomMenu.MenuImg}`;
          this.imgSrc = `https://foodrand-sitproject.servepics.com/backend/images/${this.randomMenu.MenuImg}`;
          this.showMenu = true;
          this.showQuestion1 = true;
          this.showQuestion2 = false;
          this.menuInCategory = [];
          this.allSelected = false;
          
        })
        .catch((error) => {
            if (error.response.status === 401) {
              alert("ต้องเข้าสู่ระบบก่อนทำการเพิ่มเมนู!");
              this.$router.push("/login-user");
            }
        });
    },
    addStatistic() {
        let add = {
          MenuId: this.randomMenu.MenuId,
        };
        MenuService.post("/randomstatistics", add, {
        });
    },
    addMenuHistory() {
      let add = {
        MenuName: this.randomMenu.Menuname,
      };
      MenuService.post("/menuhistory", add, {
        headers: {
          Authorization: authHeader().Authorization,
        },
      })
        .then((response) => {
          if (response.status === 201) {
            alert("เพิ่มเมนูของคุณเข้าสู่ประวัติเรียบร้อยแล้ว!");
            this.showQuestion1 = false;
            this.showQuestion2 = true;
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            alert("ต้องเข้าสู่ระบบก่อนทำการเพิ่มเมนู!");
            this.$router.push("/login-user");
          }
        });
    },
    getMenuImage(MenuImg){
      //  return "http://localhost:3000/images/"+MenuImg;
      return "https://foodrand-sitproject.servepics.com/backend/images/"+MenuImg;
    },
  },
  created() {
    this.listCategory();
    this.getMenuImage();
  },
  computed: {},
};
</script>

<style>
.fontKanit {
  font-family: "Kanit", sans-serif;
}
.fontNoto {
  font-family: "Noto Sans Thai", sans-serif;
}
.textShadow {
  text-shadow: 2px 2px 4px #2b2b2b;
}
.bgIcon {
  color: #f95335;
}

.container {
  display: flex;
  overflow-x: auto;
}
.container::-webkit-scrollbar {
  display: none;
}

.wrapper-box {
  max-width: 1000px;
  overflow: auto;
  scroll-behavior: smooth;
}

.box {
  width: 393;
  height: 512;
}
</style>