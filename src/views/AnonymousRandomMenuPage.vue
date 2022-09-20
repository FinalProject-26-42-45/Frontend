<template>
  <div class="fontNoto bg-gray1 overflow-x-hidden">
    <base-navbar></base-navbar>
    <section class="relative mx-auto">
        <nav class="flex justify-between bg-white text-black w-screen shadow-lg">
          <div class="px-5 py-6 flex w-full items-center">
            <ul class="md:flex px-4 mx-auto font-heading space-x-12">
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
        <div class="w-5/6 py-10 bg-white p-3 flex lg:flex-row md:flex-row sm:flex-col justify-center mt-12 mb-10 lg:space-x-14 lg:space-y-0 md:space-x-12 md:space-y-0 sm:space-y-4">
          <div class=" bg-yellow1 lg:w-2/6 h-full py-6 pl-3 rounded-lg flex flex-col items-center">
              <div class="grid grid-cols-2 gap-x-4 gap-y-4">
                <div v-for="c in Category" :key="c.CategoryId" class="flex flex-row">
                  <input type="radio" id="category"  
                    :value="c"  
                    v-model="selectCategory"  
                    name="category" 
                    class="lg:w-5 lg:h-5 sm:w-4 sm:h-4 accent-coral1"
                  />  
                  <p class="pl-1 lg:text-base sm:text-xs ">{{ c.CategoryName }}</p>        
                </div>
              </div>
              <div class="mt-3 flex justify-center">
                <button @click="clickCategory()" class="bg-green px-3 py-2 h-10 w-20 rounded-3xl font-semibold">สุ่มเมนู</button>
              </div>
              
          </div>
          <div class=" bg-yellow1 lg:w-2/6 md:w-64 sm:h-full pl-6 pt-6 pr-6 rounded-lg flex flex-col justify-center">
            <!-- <img src="../assets/random.png" 
                class="object-cover h-auto w-auto lg:-ml-64 z-0"/>        -->
            <div v-if="showImg">
            <div class="flex justify-center">
              <img :src="imgSrc" class="object-cover h-64 w-auto" />
            </div>
            <div class="flex justify-center mt-4">
              <input
                type="text"
                class="font-medium text-center lg:text-base rounded-md border-2 border-yellow border-opacity-50y lg:w-48 sm:w-36 sm:text-sm px-3 py-2 mb-2"
                v-model="randomMenu.Menuname"
                disabled
              />
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

           this.imgSrc = `http://localhost:3000/images/${this.randomMenu.MenuImg}`;
          //this.imgSrc = `https://foodrand.hopto.org/backend/images/${this.randomMenu.MenuImg}`;
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