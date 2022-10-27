<template>
  <div class="bg-nood fontNoto flex relative overflow-y-auto">
    <aside class="fixed left-0 top-0 h-screen p-10 px-4 py-8 border-r dark:bg-yellow">
      <div class="flex justify-center">
        <img src="../assets/logo.png" class="object-cover h-36 w-auto">
      </div>
      <p class="text-3xl font-bold text-white text-center mt-5 textShadow">FOODRAND</p>
            
      <div id="nav" class="flex flex-col flex-1 mt-10">
        <router-link to="/admin-manage" class="cursor-pointer active  flex items-center px-4 py-3 mt-5 rounded-full bg-white text-black hover:bg-gray-200" exact>
            <font-awesome-icon icon="rectangle-list" class="block h-6 w-6 " />
            <span class="mx-4 font-medium">เมนูอาหาร</span>
        </router-link>
        <router-link to="/admin-user" class="cursor-pointer active  flex items-center px-4 py-3 mt-5 rounded-full bg-white text-black hover:bg-gray-200" exact>
            <font-awesome-icon icon="address-book" class="block h-6 w-6 " />
            <span class="mx-4 font-medium">ข้อมูลผู้ใช้</span>
        </router-link>
        <a v-if="currentUser" class="cursor-pointer absolute inset-x-4 bottom-3 flex px-4 py-3 rounded-full dark:bg-coral1 dark:text-white hover:bg-coral2" @click.prevent="logOut">
          <span class="font-medium pl-2 pr-4">ออกจากระบบ</span>
          <font-awesome-icon icon="arrow-right-from-bracket" class="block h-6 w-6 " />
        </a>
      </div>
    </aside>
    <main class="flex-1 ml-52">
        <div class="min-w-screen min-h-screen bg-nood flex justify-center overflow-hidden">
            <div class="w-full lg:w-3/6">
                <div class="shadow-md my-12">
                    <table class="min-w-max w-full table-auto">
                        <thead>
                            <tr class="bg-coral1 text-white uppercase text-lg leading-normal ">
                                <th class="py-3 px-6 text-left rounded-tl-lg">เลขประจำตัว</th>
                                <th class="py-3 px-6 text-left">ชื่อ-นามสกุล</th>
                                <th class="py-3 px-6 text-left rounded-tr-lg">ชื่อผู้ใช้งาน</th>
                            </tr>
                        </thead>
                        <tbody v-for="u in users" :key="u.UserId" class="text-gray-600 font-light bg-white">
                             <tr class="border-b border-gray-200 hover:bg-gray-100">
                                <td class="py-3 px-6 text-left whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="mr-2">
                                            <font-awesome-icon icon="user" class="text-yellow"/>
                                        </div>
                                        <span class="font-medium text-lg">{{ u.UserId }}</span>
                                    </div>
                                </td>
                                <td class="py-3 px-6 text-left whitespace-nowrap">
                                    <div class="flex items-center ">
                                        <span class="font-medium text-lg">{{ u.Firstname }} {{ u.Lastname }}</span>
                                    </div>
                                </td>
                                <td class="py-3 px-6 text-left">
                                    <div class="flex items-center">
                                        <span class="font-medium text-lg">{{ u.Username }}</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>
  </div>
</template>

<script>
import MenuService from '../service/MenuService.js';

export default {
  components: {


  },
  data() {
      return {
        users: []
      }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login-admin');
      
    },
    getAllUsers() {
        MenuService.get("/users")
            .then(response => {
            this.users = response.data;
        })
    },

  },
  created() {
    this.getAllUsers();
  },
  computed: {
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