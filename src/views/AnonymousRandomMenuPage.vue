<template>
  <div class="fontNoto bg-gray1 overflow-x-hidden">
    <base-navbar></base-navbar>
    <section class="relative mx-auto z-40">
        <nav class="flex justify-between bg-white text-black w-screen shadow-lg">
          <div class="px-5 py-6 flex w-full items-center">
            <ul class="md:flex px-4 mx-auto font-heading lg:space-x-12 md:space-x-12">
              <router-link to="/" class="flex flex-row hover:text-coral1 ">
                <i class="material-icons">home</i>
                <div><a class="hover:text-coral1">หน้าแรก</a></div>
              </router-link>
              <router-link to="/anonymous-recommend-menu" class="flex flex-row hover:text-coral1 ">
                <i class="material-icons">restaurant_menu</i>
                <div><a class="hover:text-coral1">เมนูอาหาร</a></div>
              </router-link>
              <router-link to="/anonymous-random-menu" class="flex flex-row hover:text-coral1 ">
                <i class="material-icons">attractions</i>
                <div><a class="hover:text-coral1">สุ่มอาหาร</a></div>
              </router-link> 
            </ul>
          </div>
        </nav>    
      </section>
      <div class="sm:hidden lg:inline md:inline">
        <div class=" bg-banner3 w-full bg-center bg-no-repeat bg-contain lg:-mt-32 lg:pt-2 md:-mt-60 md:pt-7">
              <div class="relative flex h-screen w-screen items-center justify-center container mx-auto px-8 ">
                  <div class="absolute inset-x-0 lg:bottom-60 md:bottom-80 text-center">
                      <p class="text-3xl lg:text-5xl md:text-2xl whitespace-pre-line mb-2 pt-14">สุ่มเมนูอาหาร</p>
                      <p class="text-3xl lg:text-2xl md:text-lg whitespace-pre-line">"กินอะไรดี?" ใครที่มีคำถามนี้ทุกวัน มาสุ่มเมนูอาหารกับ Foodrand สิ่</p>
                      <p class="text-3xl lg:text-2xl md:text-lg whitespace-pre-line">ไม่ต้องคิดเองให้เสียเวลา ตามเรามาดูกันเลยว่ามีประเภทอาหารอะไรให้สุ่มบ้าง</p>
                  </div>
              </div>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="lg:w-5/6 md:w-full sm:w-full py-10 bg-white p-4 flex lg:flex-row md:flex-row sm:flex-col justify-center lg:-mt-24 md:-mt-44 sm:mt-8 mb-8 lg:space-x-14 lg:space-y-0 md:space-x-4 md:space-y-0 sm:space-y-4">
          <div class="bg-yellow1 lg:w-2/6 md:w-2/6 sm:w-full h-full py-4 px-4 pl-3 rounded-lg">
            <div class="flex flex-col space-x-8">
              <div class="flex flex-col">
                <div class="flex flex-col"> 
                    <p class="text-left font-medium text-base sm:text-sm">อาหารที่แพ้:</p>
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
                <div class="flex flex-col mt-2"> 
                    <p class="text-left font-medium text-base sm:text-sm">อาหารที่ไม่ชอบทาน:</p>
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
              <div class="flex flex-col mt-4">
                <p class="text-left font-medium -ml-8 text-base sm:text-sm">เลือกประเภทอาหาร:</p>
                <div class="grid grid-cols-2 gap-x-4 gap-y-4 mt-2">
                  <div class="flex">
                      <input type="checkbox" v-model="allSelected" @change="selectAll"
                        class="lg:w-5 lg:h-5 sm:w-4 sm:h-4 accent-coral1"
                      />
                      <p class="pl-1 text-base sm:text-sm ">เมนูทั้งหมด</p>
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
                    <p class="pl-1 text-base sm:text-sm">{{ c.CategoryName }}</p>
                  </div>
                </div>
              </div>
            </div>
              
            <div class="mt-3 flex justify-center">
              <button @click="clickCategory()" class="bg-green px-3 py-2 h-10 w-20 rounded-3xl font-semibold lg:text-base sm:text-xs">สุ่มเมนู</button>
            </div>
              
          </div>
          <div class="relative bg-randomImg lg:w-3/6 lg:block sm:hidden md:block md:w-3/6 sm:w-full h-full bg-no-repeat bg-contain bg-center"> 
            <div v-if="showMenu" class="flex justify-center lg:-ml-32 md:-ml-20 mt-32">
              <img :src="imgSrc" class="object-cover h-auto lg:w-56 md:w-40 " />
            </div>
            <div v-if="showMenu" class="absolute inset-x-0 bottom-48 lg:pl-32 md:pl-28 md:pr-2 flex space-x-2"> 
                <button
                   @click="clickRecipe(randomMenu.MenuId)"
                  class="bg-yellow3 px-2 py-1 lg:h-8 lg:w-28 md:h-7 md:w-24 rounded-3xl font-semibold md:text-sm"
                >
                  ดูสูตรอาหาร
                </button>
                <button
                  @click="openGoogleMap()"
                  class="bg-coral2 px-2 py-1lg:h-8 lg:w-28 md:h-7 md:w-24 rounded-3xl font-semibold md:text-sm"
                >
                  ดูร้านอาหาร
                </button>
            </div>
            <div class="absolute inset-x-0 lg:bottom-24 lg:mb-1 -ml-10 md:bottom-20 md:mb-3 text-center">
                <p class="font-bold lg:text-lg md:text-base">
                {{ randomMenu.Menuname }}
                </p>
            </div>
          </div>
          <div class="lg:hidden md:hidden bg-nood sm:w-full h-full pl-6 pt-6 pr-6 rounded-lg flex flex-col justify-center">
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
              <div class="mb-4 space-x-2 flex justify-center">
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
      <div class="h-full border-0 rounded-md shadow-lg flex flex-col lg:w-3/4 md:w-3/4 bg-white outline-none focus:outline-none overflow-auto">
              
        <div class="flex justify-end pr-3 pt-2">
          <button class="close text-black" type="button" @click="closeModal()" > X </button>
        </div>

        <div v-for="n in popupMenu" :key="n.MenuId" class=" bg-white rounded-md px-4 pb-4">
          <div class="pt-3 flex justify-center md:justify-center">
            <h3 class="text-3xl uppercase text-darkgray">{{ n.MenuName }}</h3>
          </div>
          <div class="lg:flex lg:flex-row justify-around mt-2 sm:flex sm:flex-col">
            <div class="flex lg:justify-center sm:justify-center md:justify-center md:pl-28  w-3/4 rounded-md">
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
import VueMultiselect from 'vue-multiselect';

export default {
    components: {
      VueMultiselect,
    },
    data() {
      return {
        Category: [],
        menu: [],
        menuInCategory: [],
        randomMenu: "",
        selectCategory: [],
        showMenu: false,
        allSelected: false,
        foodAllergens: [],
        dislikedFood: [],
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
      listCategory(){
        MenuService.get("/menucategory").then(response => {
          this.Category = response.data;
        });
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
          receive: this.foodAllergens.concat(this.dislikedFood)
        };
        MenuService.post("/menu/categorylist/anonymous", data, {
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
            // this.imgSrc = `http://localhost:3000/images/${this.randomMenu.MenuImg}`;
            this.imgSrc = `https://foodrand-sitproject.servepics.com/backend/images/${this.randomMenu.MenuImg}`;
            this.showMenu = true;
            this.menuInCategory = [];
            this.allSelected = false;
          }
        );
      },
      addStatistic() {
        let add = {
          MenuId: this.randomMenu.MenuId,
        };
        MenuService.post("/randomstatistics", add, {
        });
      },
      addTagFoodAllergens(newTagAller){
        this.foodAllergens.push(newTagAller);
      },
      addTagDislikedFood(newTagDisliked){
        this.dislikedFood.push(newTagDisliked);
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
    computed: {

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
  .textShadow {
    text-shadow: 2px 2px 4px #2b2b2b;
  }
  .bgIcon {
    color: #F95335;
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

  .margin-name {
    margin-left: 16rem;
    bottom: 4.25rem
  }

</style>