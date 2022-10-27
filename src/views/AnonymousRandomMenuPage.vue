<template>
  <div class="fontNoto bg-gray1 overflow-x-hidden">
    <base-navbar></base-navbar>
    <section class="relative mx-auto z-50">
        <nav class="flex justify-between bg-white text-black w-screen shadow-lg">
          <div class="px-5 py-6 flex w-full items-center">
            <ul class="md:flex px-4 mx-auto font-heading lg:space-x-12 md:space-x-12">
              <router-link to="/" class="flex flex-row hover:text-coral1 ">
                <i class="material-icons">home</i>
                <div><a class="hover:text-coral1">หน้าแรก</a></div>
              </router-link>
              <router-link to="/anonymous-recommend-menu" class="flex flex-row hover:text-coral1 ">
                <i class="material-icons">restaurant_menu</i>
                <div><a class="hover:text-coral1">แนะนำอาหาร</a></div>
              </router-link>
              <router-link to="/anonymous-random-menu" class="flex flex-row hover:text-coral1 ">
                <i class="material-icons">attractions</i>
                <div><a class="hover:text-coral1">สุ่มอาหาร</a></div>
              </router-link> 
            </ul>
          </div>
        </nav>    
      </section>
      <div class="flex justify-center">
        <div class="w-5/6 py-10 bg-white p-3 flex lg:flex-row md:flex-row sm:flex-col justify-center mt-12 mb-10 lg:space-x-14 lg:space-y-0 md:space-x-12 md:space-y-0 sm:space-y-4">
          <div class="bg-yellow1 w-2/6 h-full py-4 px-4 pl-3 rounded-lg">
            <div class="flex flex-col space-x-8">
              <div class="flex flex-col">
                <div class="flex flex-col"> 
                    <p class="text-left font-medium ">อาหารที่แพ้:</p>
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
                    <p class="text-left font-medium ">อาหารที่ไม่ชอบทาน:</p>
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
                <p class="text-left font-medium -ml-8">เลือกประเภทอาหาร:</p>
                <div class="grid grid-cols-2 gap-x-4 gap-y-4 mt-2">
                  <div class="flex">
                      <input type="checkbox" v-model="allSelected" @change="selectAll"
                        class="lg:w-5 lg:h-5 sm:w-4 sm:h-4 accent-coral1"
                      />
                      <p class="pl-1 lg:text-base sm:text-xs ">เมนูทั้งหมด</p>
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
                    <p class="pl-1">{{ c.CategoryName }}</p>
                  </div>
                </div>
              </div>
            </div>
              
            <div class="mt-3 flex justify-center">
              <button @click="clickCategory()" class="bg-green px-3 py-2 h-10 w-20 rounded-3xl font-semibold">สุ่มเมนู</button>
            </div>
              
          </div>
          <div class=" relative bg-randomImg w-3/6 h-full bg-no-repeat bg-contain bg-center"> 
            <div v-if="showMenu" class="flex justify-center -ml-32 mt-32">
              <img :src="imgSrc" class="object-cover h-auto w-56" />
            </div>
            <!-- <div v-if="showMenu" class="absolute inset-x-0 bottom-48 pl-32 flex space-x-2"> -->
            <div v-if="showMenu" class="absolute inset-x-0 bottom-48 pl-48 flex"> 
                <button
                   @click="clickRecipe(randomMenu.MenuId)"
                  class="bg-green px-2 py-1 h-8 w-28 rounded-3xl font-semibold"
                >
                  ดูสูตรอาหาร
                </button>
                <!-- <button
                  class="bg-red-500 px-2 py-1 h-8 w-28 rounded-3xl font-semibold"
                >
                  ดูร้านอาหาร
                </button> -->
            </div>
            <div class="absolute inset-x-0 bottom-24 mb-1 -ml-10 text-center">
                <p class="font-medium text-lg">
                {{ randomMenu.Menuname }}
                </p>
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
import MenuService from '../service/MenuService.js';
import VueMultiselect from 'vue-multiselect';
export default {
    // props:["categoryId", "menuName"],
    components: {
      VueMultiselect
    },
    data() {
      return {
        Category: [],
        menu: [],
        menuInCategory: [],
        randomMenu: '',
        selectCategory: [],
        showMenu: false,
        allSelected: false,
        foodAllergens: [],
        dislikedFood: [],
        popupMenu: [],
        MenuId: null,
        showModal: false,
        openRecipe: false,
      }
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
      listCategory(){
        MenuService.get("/menucategory").then(response => {
          this.Category = response.data;
        });
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
            this.imgSrc = `https://foodrand.hopto.org/backend/images/${this.randomMenu.MenuImg}`;
            this.showMenu = true;
            this.menuInCategory = [];
            this.allSelected = false;
            this.addStatistic();
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
      return "https://foodrand.hopto.org/backend/images/"+MenuImg;
      },
   
    },
    created() {
      this.listCategory();
      this.getMenuImage();
    },
    computed: {

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