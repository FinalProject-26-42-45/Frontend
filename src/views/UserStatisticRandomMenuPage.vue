<template>
    <div class="h-full fontNoto bg-gray1 overflow-x-hidden">
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
        <div class="sm:hidden lg:inline md:inline">
            <div class="bg-banner1 h-full w-full bg-center bg-no-repeat bg-contain lg:-mt-32 lg:pt-2 sm:-mt-64 md:-mt-60 md:pt-7">
                <div class="relative flex h-screen w-screen items-center justify-center container mx-auto px-8 ">
                    <div class="absolute inset-x-0 lg:bottom-60 md:bottom-80 text-center">
                        <p class="text-3xl lg:text-5xl md:text-3xl whitespace-pre-line">อันดับการสุ่มอาหารยอดนิยม</p>
                        <p class="text-3xl lg:text-5xl md:text-3xl whitespace-pre-line">ประจำสัปดาห์</p>
                    </div>
                </div>
            </div>
        </div>
            <!-- <div class="flex justify-center">
                <div class="flex flex-row">
                    <div v-for="(s, index) in secondStatistic(2)" :key="index" class="flex flex-col items-center mt-24">
                        <img class="img2" src="../assets/trophy2.png" />
                        <hr class="-ml-1 -mt-1 border-4 rounded-l-full border-blue dark:bg-blue line2" />
                        <div class="bg-yellow3 box2 flex flex-col items-center">
                            <div>
                                <img class="foodImg mt-8" :src="getMenuImage(s.MenuImg)" />
                            </div>
                            <div>
                                <p class="text-center text-xl font-semibold mt-4">{{ s.MenuName }}</p>
                            </div>
                            <div>
                                <p class="text-center text-xl mt-4">{{ s.RandomCount }} ครั้ง</p>
                            </div>
                        </div>
                    </div>
                    <div v-for="(s, index) in firstStatistic(1)" :key="index" class="flex flex-col items-center -ml-2">
                        <img class="img1" src="../assets/trophy1.png" />
                        <hr class="border-4 rounded-full border-blue dark:bg-blue line1" />
                        <div class="bg-yellow box1 flex flex-col items-center">
                            <div>
                                <img class="foodImg mt-8" :src="getMenuImage(s.MenuImg)" />
                            </div>
                            <div>
                                <p class="text-center text-xl font-semibold mt-4">{{ s.MenuName }}</p>
                            </div>
                            <div>
                                <p class="text-center text-xl mt-4">{{ s.RandomCount }} ครั้ง</p>
                            </div>
                        </div>
                    </div>
                    <div v-for="(s, index) in thirdStatistic(3)" :key="index" class="flex flex-col items-center -ml-2.5 mt-40 mb-2">
                        <img class="img3" src="../assets/trophy3.png" />
                        <hr class="ml-1 -mt-1 border-4 rounded-r-full border-blue dark:bg-blue line2" />
                        <div class="bg-yellow4 box3 flex flex-col items-center">
                            <div>
                                <img class="foodImg mt-8" :src="getMenuImage(s.MenuImg)" />
                            </div>
                            <div>
                                <p class="text-center text-xl font-semibold mt-4">{{ s.MenuName }}</p>
                            </div>
                            <div>
                                <p class="text-center text-xl mt-4">{{ s.RandomCount }} ครั้ง</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                </div>
            </div> -->
            <div class="flex justify-center">
                <div class="bg-blue1 box4 rounded-2xl pt-4 px-14 lg:pb-40 sm:pb-32 md:pb-40 mb-4 lg:-mt-24 sm:mt-4 md:-mt-48 relative">
                    <div v-for="(s, index) in theRestStatistic(10)" :key="index" >
                        <div class="flex flex-row-reverse mb-2">
                        <div class="bg-yellow4 w-56 h-14 rounded-r-xl z-0 -ml-8 flex justify-center">
                            <p class="text-center flex items-center text-lg">{{ s.RandomCount }} ครั้ง</p>
                        </div>
                        <div  class="bg-white w-full h-14 rounded-xl z-20 flex justify-start">
                            <p @click="clickMenu(s.MenuId)" class="text-left flex items-center text-lg pl-5 cursor-pointer">{{ s.MenuName }}</p>
                        </div>
                        </div>
                    </div>
                        <div class="absolute inset-x-0 bottom-0 flex justify-center w-full">
                        <img src="../assets/โต๊ะอาหาร.png" class="w-4/5 object-contain h-full" />
                    </div>
                </div>
            </div>
        <div v-if="openMenu" class="overflow-x-hidden overflow-y-hidden fixed inset-10 z-50 outline-none focus:outline-none flex justify-center items-center">
            <div class="h-auto border-0 rounded-md shadow-lg flex flex-col lg:w-1/2 md:w-1/2 bg-white outline-none focus:outline-none overflow-auto">
                    
                <div class="flex justify-end pr-3 pt-2">
                    <button class="close text-black" type="button" @click="closeModal()" > X </button>
                </div>
                <div v-for="pm in popupMenu" :key="pm.MenuId" class=" bg-white rounded-md px-4 pb-4">
                <div class="lg:flex lg:flex-row justify-around mt-2 sm:flex sm:flex-col">
                    <div class="lg:flex lg:justify-center sm:justify-center md:justify-center  w-3/4 rounded-md">
                        <img class="object-cover w-auto lg:h-80" :src="getMenuImage( pm.MenuImg )"/>
                    </div>
                </div>     
                <div class="pt-3 flex justify-center md:justify-center">
                    <h3 class="text-3xl uppercase text-darkgray">{{ pm.MenuName }}</h3>
                </div>
                                     
            </div>
        </div>
        
        </div>
        <div v-if="openMenu" class="show-modal"></div>
        <base-footer></base-footer>
    </div>
</template>

<script>
import MenuService from '../service/MenuService.js';

    export default {
        components: {},
        data() {
            return {
                statisticMenu: [],
                popupMenu: [],
                MenuId: null,
                showModal: false,
                openMenu: false,
            }
        },
        methods: {
            toggleModal: function(){
                this.showModal = !this.showModal;
            },
            closeModal() {
                this.openMenu = false;
            },
            clickMenu(MenuId) {
                this.popupMenu = [];
                var mn = [];
                MenuService.get("/menu/"+MenuId)
                .then(res => {
                    mn = res.data;
                    this.popupMenu.push(mn);
                });
                // this.getRecipe(MenuId);
                this.openMenu = true;
            },
            getMenuImage(MenuImg){
                // return "http://localhost:3000/images/"+MenuImg;
                return "https://foodrand-sitproject.servepics.com/backend/images/"+MenuImg;
            },
            getStatistic(){
                MenuService.get("/randomstatistics").then(response => {
                this.statisticMenu = response.data;
                });
            },

            firstStatistic(shortListSize){
                return this.statisticMenu.slice(0, shortListSize)
            },

            secondStatistic(shortListSize){
                return this.statisticMenu.slice(1, shortListSize)
            },

            thirdStatistic(shortListSize){
                return this.statisticMenu.slice(2, shortListSize)
            },

            theRestStatistic(shortListSize){
                return this.statisticMenu.slice(0, shortListSize)
            },
        },
        created() {
            this.getStatistic();
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

  .box1 {
    width: 340px;
    height: 402px;
  }

  .box2 {
    width: 340px;
    height: 341px;
  }

  .box3 {
    width: 340px;
    height: 289px;
  }

  .box4 {
    width: 630px;
    height: 500px;
  }

  .line2 {
    width: 344px;
  }

  .line1 {
    width: 350px;
  }

  .img2 {
    width: 202.18px;
    height: 199.12px;
  }

  .img1 {
    width: 289.79px;
    height: 231px;
  }

  .img3 {
    width: 191.01px;
    height: 188.12px;
  }

  .foodImg {
    width: 209px;
    height: 139px;
  }

  .active {
    color: #F95335;
  }

</style>