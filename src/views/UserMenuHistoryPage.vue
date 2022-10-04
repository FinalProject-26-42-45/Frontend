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

        <div class="min-w-screen min-h-screen bg-gray-100 flex justify-center overflow-hidden">
            <div class="w-full lg:w-3/6">
                <div class="bg-white shadow-md rounded my-12">
                    <table class="min-w-max w-full table-auto">
                        <thead>
                            <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th class="py-3 px-6 text-left">ชื่อเมนู</th>
                                <th class="py-3 px-6 text-center">ลบเมนู</th>
                            </tr>
                        </thead>
                        <tbody v-for="h in menuHistory" :key="h.HistoryId" class="text-gray-600 text-sm font-light">
                            <tr class="border-b border-gray-200 hover:bg-gray-100">
                                <td class="py-3 px-6 text-left whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="mr-2">
                                            <font-awesome-icon icon="utensils" class="text-yellow"/>
                                        </div>
                                        <span class="font-medium">{{ h.MenuName }}</span>
                                    </div>
                                </td>
                                <td class="py-3 px-6 text-center">
                                    <div class="flex item-center justify-center">
                                        <div @click="deleteMenuHistory(h.HistoryId)" class="w-4 mr-2 transform cursor-pointer hover:text-coral1 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
  data(){
    return {
      menuHistory: [],
    }
  },
   methods: {
    getMenuHistory() {
      MenuService.get(`/menuhistory`, {
        headers: {
          Authorization: authHeader().Authorization,
        },
      }).then((response) => {
        this.menuHistory = response.data;
      });
    },
    deleteMenuHistory(HistoryId){
        MenuService.delete(`/menuhistory/${HistoryId}`, {
             headers: {
                Authorization: authHeader().Authorization,
             },
        }).then(response => {
                if(response.status === 200){
                    alert("ลบเมนูเรียบร้อยแล้ว!")
                    this.$router.go()
                }
        }).catch(error => {
                if(error.status === 401){
                alert("ต้องเข้าสู่ระบบก่อนทำการลบเมนู!")
                this.$router.push('/login-user');
                }
        }) 
    },
   
   },
   created() {
    this.getMenuHistory();
    }
}
</script>