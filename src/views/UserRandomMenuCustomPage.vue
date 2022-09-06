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
              <router-link to="/user-recommend-menu">
                <div><a class="hover:text-coral1">แนะนำอาหาร</a></div>
              </router-link>
              <!-- <router-link to="/">
                <div><a class="hover:text-coral1">บทความ</a></div>
              </router-link> -->
              <router-link to="/user-random">
                <div><a class="hover:text-coral1">สุ่มอาหาร</a></div>
              </router-link>
            </ul>
          </div>
        </nav>    
      </section>
      <div class="flex justify-center">
        <div class="w-4/5 h-auto py-6 bg-white flex-col flex mt-12 mb-10 "> 
            <div class="flex justify-center">
                <input  type="text" id="MenuName" name="MenuName"
                    class="placeholder:text-black font-medium rounded-xl border-2 border-gray-400 px-3 py-2 h-10 w-80"
                    placeholder="เพิ่มเมนู"
                />
                <div class="pl-2">
                    <button class=" bg-green px-3 py-2 h-10 w-20 rounded-3xl font-semibold">
                        เพิ่ม
                    </button>
                </div>
            </div>
            <div class="flex justify-center mt-6">
                <img src="../assets/menu-custom.png" 
                    class="object-cover h-auto w-auto"/>
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