<template>
  <div class="h-full fontNoto bg-gray1 overflow-x-hidden overflow-y-auto">
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
        <div class="w-4/5 py-6 px-20 bg-white flex-col flex items-center mt-12 mb-10 "> 
            <div class="flex justify-center">
                <input  type="text" id="MenuName" name="MenuName"
                    v-model="listMenu.menu"
                    class=" placeholder:text-gray-400 font-medium rounded-xl border-2 border-gray-400 px-3 py-2 h-10 lg:w-80 sm:w-40"
                    placeholder="เพิ่มเมนู"
                />
                <div class="pl-2">
                    <button @click="submitMenu()" class=" bg-green px-3 py-2 h-10 w-20 sm:w-16 rounded-3xl font-semibold">
                        เพิ่ม
                    </button>
                </div>
            </div>
            <p v-if="invalidMenu" class="error -ml-64">กรุณาใส่ชื่อเมนูอาหาร</p>
            <div class="bg-yellow1 lg:w-1/2 h-96 p-6 rounded-lg flex flex-col mt-6" >
              <div class="bg-white w-full h-full rounded-md overflow-auto">
                <ul v-for="m in order" :key="m.id">
                  <li class="relative flex my-2 mx-4">
                    <div class="w-full">
                      <p class=" bg-gray-300 rounded-md py-2 px-2 w-full">{{ m.menu }}</p>
                    </div>
                    <div @click="deleteList(id)" class="absolute inset-y-0 right-2 cursor-pointer">
                      <p class=" bg-red-500 uppercase px-2 mt-1.5 rounded-md text-white text-xl text-center">x</p>
                    </div>
                  </li>  
                </ul> 
                <div v-if="showBtn" class="mt-2 mb-2 flex justify-center">
                  <button @click="randomMenu()" class="bg-green px-3 py-2 h-10 w-20 rounded-3xl font-semibold">สุ่มเมนู</button>
                </div>
              </div>
              <div>
                <div class="flex justify-center mt-2">
                  <input type="text" class="font-medium text-center rounded-md border-2 border-yellow border-opacity-50y w-48 px-3 py-2"
                    v-model="menuIsRandom.menu" disabled/>
                </div>
                <div v-if="shown" class="flex flex-col justify-center ">
                  <p class="text-center">คุณต้องการเก็บประวัติผลการสุ่มเมนูหรือไม่</p>
                  <div class="flex justify-center space-x-3 mt-2">
                    <button @click="addMenuHistory()" class="bg-green px-3 py-2 h-10 w-20 rounded-3xl font-semibold">ใช่</button>
                    <button @click="clickNo()" class="bg-red-500  px-3 py-2 h-10 w-20 rounded-3xl font-semibold">ไม่</button>
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
        const formData = new FormData();
        let add = {
          MenuName: this.menuIsRandom.menu,
        }
        const menuData = JSON.stringify(add);
        const blob = new Blob([menuData], {
          type: 'application/json'
        });
        formData.append('menu', blob);
        MenuService.post("/menuhistory", add, {
          headers: {
            Authorization: authHeader().Authorization,
            'Content-Type' : 'multipart/form-data'
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
    width: 393;
    height: 512;
  }

</style>