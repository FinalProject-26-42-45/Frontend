<template>
    <div class="h-full fontNoto bg-gray1 overflow-x-hidden">
        <base-navbar></base-navbar>
        <section class="relative mx-auto z-50">
            <nav class="flex justify-between bg-white text-black w-screen shadow-lg">
                <div class="px-5 py-6 pt-6 flex w-full items-center ">
                    <ul class="md:flex px-4 mx-auto font-heading lg:space-x-12 md:space-x-12">
                        <router-link to="/" class="flex flex-row hover:text-coral1">
                            <i class="material-icons">home</i>
                            <div><a class="hover:text-coral1">หน้าแรก</a></div>
                        </router-link>
                        <router-link to="/anonymous-recommend-menu" class="flex flex-row hover:text-coral1">
                            <i class="material-icons">restaurant_menu</i>
                            <div><a class="hover:text-coral1">แนะนำอาหาร</a></div>
                        </router-link>
                        <router-link to="/anonymous-random-menu" class="flex flex-row hover:text-coral1 ">
                            <i class="material-icons">attractions</i>
                            <div><a class="hover:text-coral1">สุ่มอาหาร</a></div>
                        </router-link> 
                    </ul>
                </div>
            </nav>    
        </section>
        <div class="sm:hidden lg:inline md:inline">
            <div class="bg-bannerStat h-full w-full bg-center bg-no-repeat bg-contain lg:-mt-5 sm:-mt-64 md:-mt-36">
                <div class="relative flex h-screen w-screen items-center justify-center container mx-auto px-8 ">
                    <div class="absolute inset-x-0 lg:bottom-24 md:bottom-44 text-center">
                        <p class="text-3xln lg:text-6xl md:text-3xl whitespace-pre-line">อันดับการสุ่มอาหารยอดนิยม</p>
                        <p class="text-3xl lg:text-6xl md:text-3xl whitespace-pre-line">ประจำสัปดาห์</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-center">
            <div class="bg-blue1 box4 h-auto rounded-2xl pt-8 px-14 lg:pb-40 sm:pb-32 md:pb-40 mb-4 sm:mt-4 lg:mt-4 md:-mt-32 relative">
                <div v-for="(s, index) in statistic(10)" :key="index" >
                    <div class="flex flex-row-reverse mb-2">
                        <div class="bg-yellow4 w-56 h-14 rounded-r-xl z-0 -ml-8 flex justify-center">
                            <p class="text-center flex items-center text-lg">{{ s.RandomCount }} ครั้ง</p>
                        </div>
                        <div class="bg-white w-full h-14 rounded-xl z-20 flex justify-start items-center">
                            <!-- <font-awesome-icon icon="trophy" class="pl-5" style="color:#FBCB22" /> -->
                            <p @click="clickMenu(s.MenuId)" class="text-left text-lg pl-3 cursor-pointer">{{ s.MenuName }}</p>
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
                players:[  {"name": "player1", "goals": "5"},
                    {"name": "player5", "goals": "4"},
                    {"name": "player2", "goals": "4"},
                    {"name": "player3", "goals": "2"},
                    {"name": "player4", "goals": "1"}],
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
                return "http://localhost:3000/images/"+MenuImg;
                // return "https://foodrand.hopto.org/backend/images/"+MenuImg;
            },
            getStatistic(){
                MenuService.get("/randomstatistics").then(response => {
                this.statisticMenu = response.data;
                });
            },

            // rankStatistic() {
            //     const playersSorted = this.players.sort((a, b)=> a.goals - b.goals);
            //     //console.log(playersSorted)
            //     let currentPosition = 1; let lastGoalsNbr =playersSorted[0].goals;
            //     const playersPositioned =  playersSorted.map(({name, goals})=> {
            //         if(lastGoalsNbr !== goals ) currentPosition ++;
            //     lastGoalsNbr = goals;
            //         return {name, goals, position:currentPosition}   
            //     }
            //     )
            //     console.log(playersPositioned)     
            // },

            rankMenuStatistic() {
                const statisticsSorted = this.statisticMenu.sort((a, b)=> a.RandomCount - b.RandomCount);
                let currentPosition = 1; let lastRandomCountNbr = statisticsSorted[0].RandomCount;
                const statisticPositioned =  statisticsSorted.map(({MenuName, RandomCount})=> {
                    if(lastRandomCountNbr !== RandomCount ) currentPosition ++;
                lastRandomCountNbr = RandomCount;
                    return {MenuName, RandomCount, position:currentPosition}   
                }
                )
                console.log(statisticPositioned)     
            },

            statistic(shortListSize){
                return this.statisticMenu.slice(0, shortListSize)
            },
        },
        created() {
            this.getStatistic();
            // this.rankStatistic();
            // this.rankMenuStatistic();
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
  



</style>