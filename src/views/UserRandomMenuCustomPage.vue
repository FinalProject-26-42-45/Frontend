<template>
  <div class="h-full fontNoto bg-gray1 overflow-x-hidden overflow-y-auto">
    <base-navbar></base-navbar>
    <section class="relative mx-auto z-40">
        <nav class="flex justify-between bg-white text-black w-screen shadow-lg">
          <div class="px-5 py-6 flex w-full items-center">
            <ul class="md:flex px-4 mx-auto font-heading lg:space-x-12 md:space-x-12">
                <router-link to="/user-statistic-random-menu" class="flex flex-row hover:text-coral1 ">
                    <i class="material-icons">home</i>
                    <div><p class="sm:text-sm md:text-sm lg:text-lg">หน้าแรก</p></div>
                </router-link>
                <router-link to="/user-recommend-menu" class="flex flex-row hover:text-coral1">
                    <i class="material-icons">restaurant_menu</i>
                    <div><p class="sm:text-sm md:text-sm lg:text-lg">เมนูอาหาร</p></div>
                </router-link>
                <router-link to="/user-random" class="flex flex-row hover:text-coral1">
                    <i class="material-icons">attractions</i>
                    <div><p class="sm:text-sm md:text-sm lg:text-lg">สุ่มอาหาร</p></div>
                </router-link>
                <router-link to="/user-menu-history" class="flex flex-row hover:text-coral1">
                    <i class="material-icons">history</i>
                    <div><p class="sm:text-sm md:text-sm lg:text-lg">ประวัติเมนูอาหารที่สุ่มได้</p></div>
                </router-link>
                <router-link to="/user-profile" class="flex flex-row hover:text-coral1">
                    <i class="material-icons">manage_accounts</i>
                    <div><p class="sm:text-sm md:text-sm lg:text-lg">บัญชีผู้ใช้</p></div>
                </router-link>
                </ul>
          </div>
        </nav>
      </section>
      <div class="flex justify-center">
        <div class="lg:w-4/5 md:w-4/5 sm:w-full py-6 px-20 bg-white flex-col flex items-center mt-12 mb-10 "> 
            <div class="flex justify-center">
                <input type="text" id="MenuName" name="MenuName"
                    v-model="listMenu.menu"
                    class=" placeholder:text-gray-400 font-medium rounded-xl border-2 border-gray-400 px-3 py-2 h-10 lg:w-80 md:w-72 sm:w-44"
                    placeholder="เพิ่มเมนู"
                />
                <div class="pl-2">
                    <button @click="submitMenu()" class=" bg-green px-3 py-2 h-10 w-20 sm:w-16 rounded-3xl font-semibold">
                        เพิ่ม
                    </button>
                </div>
            </div>
            <p v-if="invalidMenu" class="error -ml-64">กรุณาใส่ชื่อเมนูอาหาร</p>
            <div class="relative bg-randomCutomImg w-3/6 heightBg bg-no-repeat bg-contain bg-center lg:block md:hidden sm:hidden" >
              <div class="w-96 h-64 rounded-md overflow-auto mt-16">
                <ul v-for="m in order" :key="m.id">
                  <li class="relative flex my-2 mx-4">
                    <div class="w-80">
                      <p class=" bg-gray-300 rounded-md py-2 px-2">{{ m.menu }}</p>
                    </div>
                    <div @click="deleteList(id)" class="absolute inset-y-0 right-2 cursor-pointer">
                      <p class=" bg-red-500 uppercase px-2 mt-1.5 rounded-md text-white text-xl text-center">x</p>
                    </div>
                  </li>  
                </ul> 
                <div v-if="showBtn" class="my-2 ml-10 flex justify-center">
                  <button @click="randomMenu()" class="bg-green px-2 py-2 h-10 w-16 rounded-3xl font-semibold">สุ่มเมนู</button>
                </div>
              </div>
              <div v-if="shown">
                <div class="absolute inset-x-0 bottom-16 mb-4 -ml-10 text-center">
                  <p class="font-medium text-lg">{{menuIsRandom.menu}} </p>
                </div>
                <div class="flex flex-col justify-center -ml-20">
                  <p class="text-center">คุณต้องการเก็บประวัติผลการสุ่มเมนูหรือไม่</p>
                  <div class="flex justify-center space-x-3 mt-2">
                    <button @click="addMenuHistory()" class="bg-green px-3 py-1 h-8 w-16 rounded-3xl font-semibold">ใช่</button>
                    <button @click="clickNo()" class="bg-red-500  px-3 py-1 h-8 w-16 rounded-3xl font-semibold">ไม่</button>
                  </div>
                </div>
              </div>
            </div>  
            <div class="lg:hidden bg-yellow1 md:w-2/4 sm:w-72 h-full md:pl-6 pt-6 pr-6 rounded-lg flex flex-col justify-center mt-4">
              <div class="w-96 h-64 rounded-md overflow-auto -mt-2">
                <ul v-for="m in order" :key="m.id">
                  <li class="relative flex my-2 mx-4">
                    <div class="md:w-full sm:w-64">
                      <p class=" bg-gray-200 rounded-md py-2 px-2">{{ m.menu }}</p>
                    </div>
                    <div @click="deleteList(id)" class="absolute inset-y-0 sm:right-24 sm:pr-2 md:right-0 cursor-pointer">
                      <p class=" bg-red-500 uppercase px-2 mt-1.5 rounded-md text-white text-xl text-center">x</p>
                    </div>
                  </li>  
                </ul> 
                <div v-if="showBtn" class="my-2 flex justify-center sm:-ml-20 md:pl-24">
                  <button @click="randomMenu()" class="bg-green px-2 py-2 h-10 w-24 rounded-3xl font-semibold">สุ่มเมนู</button>
                </div>
              </div>
              <div v-if="shown">
                <p class="text-center font-bold text-sm pb-2">เมนูที่คุณได้คือ...</p>
                <div class="flex justify-center">
                  <input
                    type="text"
                    class="font-bold text-sm text-center rounded-md border-2 border-blue1 border-opacity-50y w-1/2 px-3 py-2 mb-2"
                    v-model="menuIsRandom.menu"
                    disabled
                  />
                </div>
                <div class="flex flex-col justify-center">
                  <p class="text-sm text-center sm:pl-7">คุณต้องการเก็บประวัติผลการสุ่มเมนูหรือไม่</p>
                  <div class="flex justify-center space-x-3 my-2">
                    <button @click="addMenuHistory()" class="bg-green px-3 py-1 h-8 w-16 rounded-3xl font-semibold">ใช่</button>
                    <button @click="clickNo()" class="bg-red-500  px-3 py-1 h-8 w-16 rounded-3xl font-semibold">ไม่</button>
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
import authHeader from '../service/AuthenHeader';

export default {
    components: {
      
    },
    data() {
      return {
        Category: [],
        order: [],
        listMenu: {
          id: null,
          menu: null,
        },
        invalidMenu: false,
        menuIsRandom: "",
        imgSrc: "",
        shown: false,
        showBtn: false,
        pic: "@/assets/menu-custom.png",
      }
    },
    methods: {
      listCategory(){
        MenuService.get("/menucategory").then(response => {
          this.Category = response.data;
        });
      },
      submitMenu(){
        this.invalidMenu = this.listMenu.menu === null ? true : false;
        console.log(this.invalidMenu);
        if(this.invalidMenu){
          return;
        }
        this.addListMenu();
        // this.showBtn = true;
      },
      addListMenu(){
        this.order.push({...this.listMenu});
        this.listMenu.menu = "";
        this.showBtn = true;
      },
      deleteList(id){
        this.order.splice(this.order.indexOf(id), 1);
      },
      randomMenu() {
        var random = Math.floor(Math.random() * this.order.length);
        this.menuIsRandom = this.order[random];
        this.shown = true;
      },
      clickNo(){
        this.shown = false;
      },
      addMenuHistory(){
        let add = {
          MenuName: this.menuIsRandom.menu,
        }
        MenuService.post("/menuhistory", add, {
          headers: {
            Authorization: authHeader().Authorization,
          }
        }).then(response => {
          if (response.status === 201) {
            alert("เพิ่มเมนูของคุณเข้าสู่ประวัติเรียบร้อยแล้ว!")
           this.$router.go;
           this.shown = false;
          }
        }).catch(error => {
          if(error.response.status === 401){
            alert("ต้องเข้าสู่ระบบก่อนทำการเพิ่มเมนู!")
            this.$router.push('/login-user');
          }
        })
      }
   
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
    width: 393px;
    height: 512px;
  }

  .heightBg{
    height: 512px;
  }

</style>