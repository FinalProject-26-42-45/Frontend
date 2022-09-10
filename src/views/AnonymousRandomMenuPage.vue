<template>
  <div class="h-full fontNoto bg-gray1 overflow-x-hidden">
    <base-navbar></base-navbar>
    <section class="relative mx-auto">
        <nav class="flex justify-between bg-white text-black w-screen shadow-lg">
          <div class="px-5 py-6 flex w-full items-center">
            <ul class="hidden md:flex px-4 mx-auto font-heading space-x-12">
              <!-- <router-link to="/">
                <div><a class="hover:text-coral1">หน้าแรก</a></div>
              </router-link> -->
              <router-link to="/">
                <div><a class="hover:text-coral1">แนะนำอาหาร</a></div>
              </router-link>
              <!-- <router-link to="/">
                <div><a class="hover:text-coral1">บทความ</a></div>
              </router-link> -->
              <router-link to="/anonymous-random-menu">
                <div><a class="hover:text-coral1">สุ่มอาหาร</a></div>
              </router-link>
            </ul>
          </div>
        </nav>    
      </section>
      <div class="flex justify-center">
        <div class="w-5/6 h-auto py-10 bg-white flex justify-center mt-12 mb-10 ">
          <div class=" bg-yellow1 w-2/5 pl-6 pt-6 pr-6 rounded-lg flex flex-col justify-center">
            <!-- <img src="../assets/random.png" 
                class="object-cover h-auto w-auto lg:-ml-64 z-0"/>        -->
            <div v-if="showImg">
            <div class="flex justify-center">
              <img :src="imgSrc" class="object-cover h-64 w-auto" />
            </div>
            <div class="flex justify-center mt-4">
              <input
                type="text"
                class="font-medium text-center rounded-md border-2 border-yellow border-opacity-50y w-48 px-3 py-2"
                v-model="randomMenu.Menuname"
                disabled
              />
            </div>
          </div>
          </div>

          <div class="w-2/5 flex justify-center">
            <div class=" bg-yellow1 pl-6 pt-6 pr-6 rounded-lg items-center">
              <div class="grid grid-cols-2 gap-x-8 gap-y-4">
                <div v-for="c in Category" :key="c.CategoryId" class="flex flex-row">
                  <input type="radio" id="category"  
                    :value="c"  
                    v-model="selectCategory"  
                    name="category" 
                    class="w-5 h-5 accent-coral1"
                  />  
                  <p class="pl-1 ">{{ c.CategoryName }}</p>  

                     
                </div>
              </div>
              <div class="my-3 flex justify-center">
                <button @click="clickCategory()" class="bg-green px-3 py-2 h-10 w-20 rounded-3xl font-semibold">สุ่มเมนู</button>
              </div>
              
            </div>
          </div>
        </div>
      </div> 
    <base-footer></base-footer>
  </div>
</template>

<script>
import MenuService from '../service/MenuService.js';

export default {
    // props:["categoryId", "menuName"],
    components: {
      
    },
    data() {
      return {
        Category: [],
        menuInCategory: [],
        randomMenu: '',
        selectCategory: null,
        showImg: false,
      }
    },
    methods: {
      listCategory(){
        MenuService.get("/menucategory").then(response => {
          this.Category = response.data;
        });
      },
      clickCategory() {
      MenuService.get("/menu/category/" + this.selectCategory.CategoryId).then(
        (response) => {
          for (let each in response.data) {
            this.menuInCategory.push({
              Menuname: response.data[each].MenuName,
              MenuImg: response.data[each].MenuImg,
            });
          }
          var random = Math.floor(Math.random() * this.menuInCategory.length);
          this.randomMenu = this.menuInCategory[random];

          // this.imgSrc = `http://localhost:3000/images/${this.randomMenu.MenuImg}`;
          this.imgSrc = `https://foodrand.hopto.org/backend/images/${this.randomMenu.MenuImg}`;
          this.showImg = true;
        }
      );
    },

   
    },
    created() {
      this.listCategory();


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