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
              <router-link to="/anonymous-select-category">
                <div><a class="hover:text-coral1">สุ่มอาหาร</a></div>
              </router-link>
            </ul>
          </div>
        </nav>    
      </section>
      <div class="flex justify-center">
        <div class="w-5/6 h-auto p-6 bg-white flex justify-center mt-12 mb-10 ">
          <div class="w-2/5 flex justify-center">
            <img src="../assets/random.png" 
                class="object-cover h-auto w-auto"/>
          </div>
          <div class="w-2/5 flex justify-center">
            <div class=" bg-yellow1 p-6 rounded-lg flex items-center">
              <div class="grid grid-cols-2 gap-x-8 gap-y-4">
                <div v-for="c in Category" :key="c.CategoryId" class="flex flex-row">
                  <input type="checkbox" id="category"  
                    :value="c"  
                    v-model="selectCategory"  
                    name="category" 
                    class="w-5 h-5 accent-coral1"
                  />  
                <p class="pl-1 ">{{ c.CategoryName }}</p>     
                </div>
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
    components: {
      
    },
    data() {
      return {
        Category: [],
      }
    },
    methods: {
      listCategory(){
        MenuService.get("/menucategory").then(response => {
          this.Category = response.data;
        });
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

</style>