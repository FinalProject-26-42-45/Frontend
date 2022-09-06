<template>
  <div class="h-full fontNoto bg-gray1 overflow-x-hidden">
    <base-navbar>
      
    </base-navbar>
      <section class="relative mx-auto">
        <nav class="flex justify-between bg-white text-black w-screen shadow-lg">
          <div class="px-5 py-6 flex w-full items-center">
            <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
              <router-link to="/">
                <div><a class="hover:text-coral1">หน้าแรก</a></div>
              </router-link>
              <router-link to="/">
                <div><a class="hover:text-coral1">แนะนำอาหาร</a></div>
              </router-link>
              <router-link to="/">
                <div><a class="hover:text-coral1">บทความ</a></div>
              </router-link>
              <router-link to="/">
                <div><a class="hover:text-coral1">สุ่มอาหาร</a></div>
              </router-link>
            </ul>
          </div>
        </nav>
        
      </section>
      
    <div>
      <img class="object-cover w-full" alt="home" src="../assets/pic-home1.png">
    </div>
    <div>
      <div class="flex items-center">
          <button id="left-button" @click="scroll_left">
            <font-awesome-icon icon="chevron-left" class="block h-14 w-14 mt-4" style="color:#FFB911" />
          </button>
          <ul class="container wrapper-box mt-8 list-style-none">
            <li @click="retrieveMenu" class="hoverCate">
              <div class=" w-28 cursor-pointer">
                <img src="../assets/อาหารทั้งหมด.png" class="object-cover picCateAll w-auto mt-2" />
                <p class="text-lg mt-2 pl-4">เมนูทั้งหมด</p>  
              </div>
            </li>
            <li v-for="list in category" 
                :key="list.id" 
                @click="clickCategory(list.CategoryId)"
                class="hoverCate ">
              <div class=" w-28 cursor-pointer">
                <img :src="require(`../assets/${list.CategoryName}.png`)" 
                    class="object-cover h-28 w-auto"/>
                <p class="text-lg text-center">{{ list.CategoryName }} </p>
              </div>
            </li>
          </ul>
      <button id="right-button" @click="scroll_right" class="page-item">
        <font-awesome-icon icon="chevron-right" class="block h-14 w-14 mt-4" style="color:#FFB911"/>
      </button>
          
    </div>
  </div>
  

    <div class="flex justify-center my-4">
      <div>
        <input v-model="boxsearch" v-show="search.click" placeholder="ค้นหา"
          class="p-2 py-2 lg:w-80 sm:w-60 bg-white rounded border-2 border-oldrose">
      </div>
      <div>
        <button class="bg-coral1 rounded-full text-white py-2 px-2 w-10 h-10 hover:text-pink"  @click="statusSearch" v-show="search.nClick">
          <span class="material-icons">search</span>
        </button>
        <button class="hover:bg-coral2 bg-coral1 py-1.5 px-3 mt-0.5 rounded text-white lg:text-lg sm:text-base" v-show="search.click" @click="statusSearch">
          ยกเลิก
        </button>
      </div>
    </div>

    <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 text-left justify-items-center my-4 mx-16">
      <div v-for="(m, index) in filterMenu" :key="index" :id="m.MenuId"  class="w-full p-1 md:p-2">
        <base-block class="relative bg-nood">
          <img :src="getMenuImage(m.MenuImg)" class="object-cover w-full rounded-t-md border-gray-200 lg:h-48 sm:h-36 bg-gray-200"/>
          <div class="text-left p-2">
            <p class="mt-3">เมนู: {{ m.MenuName }}</p>
            <p class="mt-3">แคลอรี: {{ m.Calories }}</p>
          </div>
          <div class="mt-8">
            <router-link to="/">
              <button @click="clickRecipe(m.MenuId)"  class="bg-yellow hover:text-white py-1.5 w-32 rounded-md text-black text-base absolute bottom-2 right-2">
                <p class="lg:inline">สูตรอาหาร</p>
                <!-- <font-awesome-icon class="sm:hidden md:hidden lg:inline" icon="arrow-right"/> -->
              </button>
            </router-link>
          </div>
        </base-block>
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
import MenuService from '../service/MenuService.js';

export default {
  components: {

  },
  data(){
    return {
      menu: [],
      category: [],
      // recipe: [],
      popupMenu: [],
      MenuId: null,
      CategoryId: null,
      showModal: false,
      openRecipe: false,
      search: {click: false, nClick: true},
      boxsearch: "",
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
    },
    retrieveCategory() {
      MenuService.get("/menucategory")
        .then(response => {
          this.category = response.data;
        })
    },
    clickCategory(CategoryId) {
      MenuService.get("/menu/category/"+CategoryId)
        .then(response => {
          this.menu = response.data;
        });

    },
    retrieveMenu() {
      MenuService.get("/menu")
        .then(response => {
          this.menu = response.data;
        })
    },
    getMenuImage(MenuImg){
      return "http://localhost:3000/"+MenuImg;
      // return "https://foodrand.hopto.org/backend/"+MenuImg;
    },
    // getRecipe(MenuId) {
    //   console.log("MenuId:"+MenuId);
    //   MenuService.get("/menu/ingredient/"+MenuId)
    //     .then(response => {
    //       this.recipe = response.data;
    //     })
    // },
    statusSearch(){
      this.search.click = !this.search.click
      this.search.nClick = !this.search.nClick
      this.boxsearch = ""
    },
    scroll_left() {
      let content = document.querySelector(".wrapper-box");
      content.scrollLeft -= 1000;
    },
    scroll_right() {
      let content = document.querySelector(".wrapper-box");
      content.scrollLeft += 1000;
    }
    
  },
  created() {
    this.retrieveMenu(); 
    this.retrieveCategory();

  },
  computed: {
    filterMenu(){
      return this.menu.filter(({ MenuName }) =>
      { return MenuName.toLowerCase()
      .includes(this.boxsearch.toLowerCase())
      }
    );
    }
  }
};
</script>

<style>
  .container {
    overflow-x: auto;
  } 
  .container::-webkit-scrollbar {
    display: none;
  }

  .wrapper-box {
  overflow: auto;
  scroll-behavior: smooth;
  }

  .picCateAll {
    height: 100px;
  }

</style>