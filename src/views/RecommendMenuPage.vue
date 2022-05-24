<template>
  <div class="h-full fontNoto bg-gray1">
    <base-navbar></base-navbar>
    <!-- <div class="flex flex-wrap h-screen">
      <section class="relative mx-auto">
        <nav class="flex justify-between bg-white text-black w-screen">
          <div class="px-5 xl:px-12 py-6 flex w-full items-center">
            <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
              <li><a class="hover:text-gray-200" href="#">หน้าแรก</a></li>
              <li><a class="hover:text-gray-200" href="#">แนะนำอาหาร</a></li>
              <li><a class="hover:text-gray-200" href="#">บทความ</a></li>
              <li><a class="hover:text-gray-200" href="#">สุ่มอาหาร</a></li>
            </ul>
          </div>
        </nav>
        
      </section>
    </div> -->
    <div>
      <img class="object-cover w-full" alt="home" src="../assets/pic-home1.png">
    </div>
    <!-- <div class="flex items-center menuSlider pl-4">
      <nav aria-label="Page navigation">
        <ul class="flex list-style-none">
          <li class="page-item">
              <font-awesome-icon icon="chevron-left" class="block h-14 w-14 mt-12" style="color:#FFB911" />
          </li>

          <li class=" page-item page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 hover:bg-gray-200 focus:shadow-none">
            <img src="../assets/1.อาหารไทย.png"
              class="object-cover h-32 w-auto"
              />
            <p class="ml-8">อาหารไทย</p>
          </li>
          <li class=" page-item page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 hover:bg-gray-200 focus:shadow-none">
            <img src="../assets/2.อาหารจานเดียว.png"
              class="object-cover h-32 w-auto"
              />
            <p class="ml-4">อาหารจานเดียว</p>
          </li>
          <li class=" page-item page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 hover:bg-gray-200 focus:shadow-none">
            <img src="../assets/3.ก๋วยเตี๋ยว.png"
              class="object-cover h-32 w-auto"
              />
            <p class="ml-8">ก๋วยเตี๋ยว</p>
          </li>
          <li class=" page-item page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 hover:bg-gray-200 focus:shadow-none">
            <img src="../assets/4.Fastfood.png"
              class="object-cover h-32 w-auto"
              />
            <p class="ml-8">ฟาสต์ฟู้ด</p>
          </li>
          <li class=" page-item page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 hover:bg-gray-200 focus:shadow-none">
            <img src="../assets/5.อาหารตามสั่ง.png"
              class="object-cover h-32 w-auto"
              />
            <p class="ml-6">อาหารตามสั่ง</p>
          </li>
          <li class=" page-item page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 hover:bg-gray-200 focus:shadow-none">
            <img src="../assets/6.อาหารเช้า.png"
              class="object-cover h-32 w-auto"
              />
            <p class="ml-8">อาหารเช้า</p>
          </li>
          <li class=" page-item page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 hover:bg-gray-200 focus:shadow-none">
            <img src="../assets/7.อาหารอีสาน.png"
              class="object-cover h-32 w-auto"
              />
            <p class="ml-7">อาหารอีสาน</p>
          </li>
          <li class=" page-item page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 hover:bg-gray-200 focus:shadow-none">
            <img src="../assets/8.อาหารเหนือ.png"
              class="object-cover h-32 w-auto"
              />
            <p class="ml-7">อาหารเหนือ</p>
          </li>
          <li class=" page-item page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 hover:bg-gray-200 focus:shadow-none">
            <img src="../assets/9.อาหารใต้.png"
              class="object-cover h-32 w-auto"
              />
            <p class="ml-8">อาหารใต้</p>
          </li>
           <li class=" page-item page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 hover:bg-gray-200 focus:shadow-none">
            <img src="../assets/10.อาหารริมทาง.png"
              class="object-cover h-32 w-auto"
              />
            <p class="ml-5">อาหารริมทาง</p>
          </li>
          <li class=" page-item page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 hover:bg-gray-200 focus:shadow-none">
            <img src="../assets/11.อาหารเพื่อสุขภาพ.png"
              class="object-cover h-32 w-auto"
              />
            <p class="ml-4">อาหารเพื่อสุขภาพ</p>
          </li> 

          <li class="page-item">
            <font-awesome-icon icon="chevron-right" class="block h-14 w-14 mt-12" style="color:#FFB911"/>
          </li>
        </ul>
      </nav>
    </div> -->

    <div class="flex justify-center items-center my-4">
      <div>
        <input placeholder="ค้นหา"
          class="p-2 py-2 mt-1 lg:w-80 sm:w-60 bg-white rounded-l-md border-2 border-gray-400">
      </div>
      <div class="">
        <button class="bg-coral1 rounded-r-md text-white py-2 px-2 w-11 h-11 mt-1">
          <span class="material-icons">search</span>
        </button>
      </div>
    </div>

    <div v-for="c in category" :key="c.CategoryId" class=" pl-16">
      <p class=" text-xl text-black font-bold">{{ m.MenuName }}</p>
    </div>
    <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 text-left justify-items-center my-4 mx-16">
      <div v-for="m in menu" :key="m.MenuId" class="w-full p-1 md:p-2">
        <base-block class="relative">
          <img :src="getMenuImage(m.MenuImg)" class="object-cover w-full rounded-t-md border-gray-200 lg:h-48 sm:h-36 bg-gray-200"/>
          <div class="text-left p-2">
            <p class="mt-3">เมนู: {{ m.MenuName }}</p>
            <p class="mt-3">แคลอรี: {{ m.Calories }}</p>
          </div>
          <div class="mt-8">
            <router-link to="/">
              <button @click="clickRecipe(m.MenuId)"  class="bg-yellow hover:text-white py-1.5 w-32 rounded-md text-black text-base absolute bottom-2 right-2">
                <p class="md:hidden lg:inline">สูตรอาหาร</p> <font-awesome-icon icon="arrow-right"/>
              </button>
            </router-link>
          </div>
        </base-block>
      </div> 
    </div>
    
    <div v-if="openRecipe"  class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none flex justify-center items-center mb-4">
      <div class="h-96 border-0 rounded-md shadow-lg flex flex-col lg:w-3/4 md:w-1/2 bg-white outline-none focus:outline-none">
              
        <div class="flex justify-end pr-3 pt-2">
          <button class="close text-black" type="button" @click="closeModal()" > X </button>
        </div>

        <div v-for="n in popupMenu" :key="n.MenuId"  class=" bg-white rounded-md px-4 pb-4">
          <div class="pt-3 flex justify-center md:justify-center">
            <h3 class="text-3xl uppercase text-darkgray">{{ n.MenuName }}</h3>
          </div>
          <div class="lg:flex lg:flex-row justify-around mt-2 space-x-5 sm:flex sm:flex-col">
            <div class="lg:flex lg:justify-center sm:justify-center mt-2 w-3/5 rounded-md border-gray-200 bg-gray-200">
              <img class="object-cover w-auto lg:h-52 p-2 mt-12" :src="getMenuImage( n.MenuImg )"/>
            </div>

            <!-- <div class=" mt-2 w-2/5 space-y-2 ">
              <p class="text-xl text-left whitespace-nowrap">Name: {{pr.productName}}</p>
              <p class="text-lg text-left whitespace-nowrap">Type: {{pr.productType}}</p>
              <p class="text-lg text-left whitespace-nowrap">Price: {{pr.productPrice}}</p>
              <p class="text-lg text-left whitespace-nowrap">Size: {{pr.productSize}}</p>                       
            </div> -->
          </div>
                                      
          <div class="mt-6">
            <p class="text-lg text-justify">{{ n.Preparation }}</p>
          </div>
        </div>
            
      </div>
    </div>
    <div v-if="openRecipe" class="show-modal"></div>

    <base-footer></base-footer>

  </div>
</template>

<script>
import MenuService from '../service/MenuService.js';

export default {
  components: {

  },
  data(){
    return {
      menu: [],
      category: [],
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
      this.openRecipe = true;
    },
    retrieveCategory() {
      MenuService.get("/menucategory")
        .then(response => {
          this.category = response.data;
        })
    },
    retrieveMenu() {
      MenuService.get("/menu")
        .then(response => {
          this.menu = response.data;
        })
    },
    getMenuImage(MenuImg){
      return "http://localhost:3000/"+MenuImg;
    },
  },
  created() {
    this.retrieveMenu(); 
  },
};
</script>

<style>
  .menuSlider {
    width: 1625px;
    height: 221px;
  }

</style>