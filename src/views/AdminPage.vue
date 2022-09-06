<template>
  <div class="bg-nood fontNoto flex relative overflow-y-auto">
    <aside class="fixed left-0 top-0 h-screen p-10 px-4 py-8 border-r dark:bg-yellow">
      <div class="flex justify-center">
        <img src="../assets/logo.png" class="object-cover h-36 w-auto">
      </div>
      <p class="text-3xl font-bold text-white text-center mt-5 textShadow">FOODRAND</p>
            
      <div class="flex flex-col justify-between flex-1 mt-12">
          <a class="flex items-center px-4 py-3 rounded-full dark:bg-white dark:text-black hover:bg-gray-200" >
            <font-awesome-icon icon="address-book" class="block h-6 w-6 " />

            <span class="mx-4 font-medium">ข้อมูลผู้ใช้</span>
          </a>

          <a class="flex items-center px-4 py-3 mt-5 rounded-full dark:bg-white dark:text-black hover:bg-gray-200" >
            <font-awesome-icon icon="rectangle-list" class="block h-6 w-6 " />

             <span class="mx-4 font-medium">เมนูอาหาร</span>
          </a>

          <a class="flex items-center px-4 py-3 mt-5 rounded-full dark:bg-white dark:text-black hover:bg-gray-200" >
            <font-awesome-icon icon="newspaper" class="block h-6 w-6 " />

            <span class="mx-4 font-medium">บทความ</span>
          </a>

            <a v-if="currentUser" class="absolute inset-x-4 bottom-3 flex px-4 py-3 rounded-full dark:bg-coral1 dark:text-white hover:bg-coral2" @click.prevent="logOut">
              <span class="font-medium pl-2 pr-4">ออกจากระบบ</span>
              <font-awesome-icon icon="arrow-right-from-bracket" class="block h-6 w-6 " />
            </a>
      </div>
    </aside>
    <main class="flex-1 ml-52">
      <!-- <div class="flex my-4">
        <div>
          <input placeholder="ค้นหา" v-model="search"
            class="p-2 py-2 mt-1 lg:w-80 sm:w-60 bg-white rounded-l-md border-2 border-gray-400">
        </div>
        <div class="">
          <button class="bg-coral1 rounded-r-md text-white py-2 px-2 w-11 h-11 mt-1">
            <span class="material-icons">search</span>
          </button>
        </div>
      /div> -->
      <!-- <div>
        <div class="flex items-center">
            <button id="left-button" @click="scroll_left">
              <font-awesome-icon icon="chevron-left" class="block h-14 w-14 mt-4" style="color:#FFB911" />
            </button>
            <ul class="container wrapper-box mt-8">
              <li v-for="list in category" :key="list.id" @click="clickCategory(list.CategoryId)">
                <div class=" w-36">
                  <img :src="require(`../assets/${list.CategoryName}.png`)" 
                      class="object-cover h-32 w-auto"/>
                  <p class="text-lg whitespace-nowrap text-center">{{ list.CategoryName }} </p>
                </div>
              </li>
            </ul>
            <button id="right-button" @click="scroll_right" class="page-item">
              <font-awesome-icon icon="chevron-right" class="block h-14 w-14 mt-12" style="color:#FFB911"/>
            </button>            
        </div>
        <button @click="retrieveMenu">
          เมนูทั้งหมด
        </button>  
      </div> -->
      <div class="flex justify-center my-4">
        <div>
          <input v-model="boxsearch" v-show="search.click" placeholder="ค้นหา"
            class="p-2 py-2 lg:w-80 sm:w-60 bg-white rounded border-2 border-oldrose">
        </div>
        <div>
          <button class="bg-coral1 rounded-full text-white py-2 px-2 w-10 h-10 hover:text-pink"  @click="statusSearch" v-show="search.nClick">
            <span class="material-icons">search</span>
          </button>
          <button class="hover:bg-coral2 bg-coral1 py-1.5 px-3 mt-0.5 rounded text-white lg:text-lg sm:text-base" v-show="search.click" @click="statusSearch">
            ยกเลิก
          </button>
        </div>
      </div>
            <div class="lg:flex lg:justify-center pb-4">
                <button @click="toggleModal" class=" hover:bg-amber-400 bg-yellow py-2 px-20 rounded-sm text-black hover:text-white text-lg font-medium">
                    เพิ่มเมนู
                </button>
            </div>
            <add-menu v-if="showModal" @save-menu="addNewMenu" @close="toggleModal">
            </add-menu>
            <div v-if="showModal" class="show-modal"></div>

            <edit-menu v-if="openEdit" @close="closeModal" :mId="menuEdit">
            </edit-menu>
            <div v-if="openEdit" class="show-modal"></div>

            <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-left">
                <div v-for="(m, index) in filterMenu" :key="index" :id="m.MenuId" class="w-full p-1 md:p-2">
                    <base-block class="relative bg-oldrose">
                        <img :src="getMenuImage(m.MenuImg)" class="object-cover w-full rounded-t-md border-gray-200 lg:h-56 sm:h-36 bg-gray-200"/>
                        <div class="text-left p-2">
                            <p class="mt-3">ชื่อเมนู: {{ m.MenuName }}</p>
                            <!-- <p class="mt-3">ประเภทอาหาร: {{ m.CategoryName }}</p> -->
                            <p class="mt-3">แคลอรี: {{ m.Calories }}</p>
                            <p class="mt-3">วิธีการทำ:</p>
                            <p class="mt-1 whitespace-pre-line">{{ m.Preparation }}</p>
                        </div>
                        <div class="flex justify-center pb-8 pt-4">
                            <button class="bottom-4 left-4 absolute text-white bg-yellow hover:bg-amber-300 hover:text-black rounded-lg px-2 py-1" @click="editMenu(m.MenuId)">
                                <font-awesome-icon icon="edit" class="h-4 w-4"/>
                            </button>
                            <button class="bottom-4 left-14 absolute text-white bg-red-600 hover:bg-red-400 hover:text-black rounded-lg px-2 py-1" @click="deleteMenu(m.MenuId)">
                                <font-awesome-icon icon="trash-alt" class=""/>
                            </button>
                        </div>
                    </base-block>
                </div> 
            </div>

    </main>
  </div>
</template>

<script>
import MenuService from '../service/MenuService.js';
import AddMenu from '../components/AddMenu.vue';
import EditMenu from '../components/EditMenu.vue';
import authHeader from '../service/AuthenHeader';

export default {
  components: {
    AddMenu,
    EditMenu

  },
  data() {
      return {
        menu: [],
        category: [],
        show: false,
        showModal: false,
        openEdit: false,
        MenuId: null,
        menuEdit: "",
        search: {click: false, nClick: true},
        boxsearch: "",

      }
  },
  methods: {
    retrieveMenu() {
      MenuService.get("/menu")
        .then(response => {
          this.menu = response.data;
          
        })
        
    },
    getMenuImage(MenuImg){
      return "http://localhost:3000/"+MenuImg;
      // return "https://foodrand.hopto.org/backend/"+MenuImg;
    },
    toggleModal: function() {
        this.showModal = !this.showModal;
    },
    closeModal(){
      this.openEdit = false;
    },
    editMenu(MenuId){
      this.menuEdit = MenuId;
      this.openEdit = true;
    },
    deleteMenu(MenuId) {
      MenuService.delete("/menu/"+ MenuId, {
        headers: {
          Authorization: authHeader().Authorization,
        },
      }).then(response => {
        this.menu = response.data;
        alert("เมนูถูกลบแล้ว!");
        this.$router.go();
      }).catch(error => {
        if(error.response.status === 401){
          alert("ต้องเข้าสู่ระบบก่อนทำการลบรูป!")
          this.$router.push('/');
        }
          })
    },
    statusSearch(){
      this.search.click = !this.search.click
      this.search.nClick = !this.search.nClick
      this.boxsearch = ""
    },
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login-admin');
      
    },
    retrieveCategory() {
      MenuService.get("/menucategory")
        .then(response => {
          this.category = response.data;
        })
    },
    clickCategory(CategoryId) {
      MenuService.get("/menu/category/"+CategoryId)
        .then(response => {
          this.menu = response.data;
        });

    },
    scroll_left() {
      let content = document.querySelector(".wrapper-box");
      content.scrollLeft -= 1000;
    },
    scroll_right() {
      let content = document.querySelector(".wrapper-box");
      content.scrollLeft += 1000;
    }
  },
  created() {
    this.retrieveMenu(); 
    this.retrieveCategory();
  },
  computed: {
    filterMenu(){
      return this.menu.filter(({ MenuName }) =>
      { return MenuName.toLowerCase()
      .includes(this.boxsearch.toLowerCase())
      }
    );
    },
    currentUser() {
      return this.$store.state.auth.users;
    },
  }
};
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