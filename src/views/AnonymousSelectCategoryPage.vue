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
        <div class="w-auto h-auto p-6 bg-white flex justify-center mt-12 mb-10 ">
          <div class="">
            <p class="text-lg ">กรุณาเลือกประเภทอาหารที่จะทำการสุ่ม</p>
            <ul class=" mt-4 list-style-none lg:grid lg:grid-cols-8 lg:gap-8 md:grid md:grid-cols-4 md:gap-4 sm:gap-y-4">
                <li class="">
                  <div class="bg-coral2 pic rounded-md cursor-pointer">
                    <div class="p-4">
                      <img src="../assets/อาหารทั้งหมด.png" class="object-cover picCateAll w-auto" />
                    </div>
                    <div class="pl-3">
                      <div class=" h-auto w-28 pt-1 bg-white rounded-b-md">
                        <p class="text-base text-center py-1">เมนูทั้งหมด</p>  
                      </div>
                    </div>
                  </div>
                </li>
              <li v-for="list in category" 
                  :key="list.id" 
                  class="">
                  <router-link :to="{
                    name: 'anonymous-random-menu',
                    params: {
                      categoryId: list.CategoryId,
                    },
                  }">
                  <div class="bg-coral2 pic rounded-md cursor-pointer">
                    <div class="pt-4 pl-4 pr-4 pb-1">
                    <img :src="require(`../assets/${list.CategoryName}.png`)" 
                        class="object-cover h-28 w-auto"/>
                    </div> 
                    <div class="pl-3">
                      <div class="h-auto w-28 bg-white rounded-b-md">
                        <p class="text-base text-center pt-2 py-1">{{ list.CategoryName }} </p>
                      </div>
                    </div>
                  </div>
                  </router-link>
              </li>
            </ul>
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
        menu: [],
        category: [],
        CategoryId: null,
      }
    },
    methods: {
      retrieveCategory() {
      MenuService.get("/menucategory")
        .then(response => {
          this.category = response.data;
          
        })
      },
      
    },
    created() {
      this.retrieveCategory();

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
  .pic {
    width: 135px;
    height: 175px;
  }


</style>