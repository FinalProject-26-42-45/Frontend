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
      <div class="flex justify-center">
        <div class="w-5/6 h-auto p-6 bg-white flex justify-center space-x-4 mt-12 mb-10 ">
          
            <div class="w-3/6 flex justify-center cursor-pointer">
              <router-link to="/user-random-menu">
                <img src="../assets/user-category.png" 
                    class="object-cover h-auto w-auto"/>
              </router-link>
            </div>
          
          <div class="w-3/6 flex justify-center cursor-pointer">
            <router-link to="/user-random-menu-custom">
              <img src="../assets/user-custom.png" 
                  class="object-cover h-auto w-auto"/>
            </router-link>
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

  .box {
    width: 393;
    height: 512;
  }

</style>