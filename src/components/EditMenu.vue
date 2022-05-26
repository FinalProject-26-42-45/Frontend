<template>
    <div class="fontNoto overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none flex justify-center items-center mb-4">
        <div class="h-96 border-0 rounded-md shadow-lg flex flex-col lg:w-3/4 bg-oldrose outline-none focus:outline-none">
            <div class="flex justify-end">
                <button class="close text-black" type="button" @click="closeModal" > X </button>
            </div>
            <div class="felx text-center font-medium text-black text-2xl">
                <p>แก้ไขเมนู</p>
            </div>

            <div class=" bg-oldrose rounded-md px-4 ">
                <div class="lg:flex lg:flex-row justify-around mt-2 lg:space-x-5 sm:flex-col">
                    <div class="mt-2 lg:w-2/5 lg:space-y-2 ">
                        <div>
                            <label class="label">ชื่อเมนู: </label>
                            <input  type="text" id="MenuName" name="MenuName"
                                v-model="MenuName"   class="font-medium rounded-md border-2 border-yellow border-opacity-50y w-full px-3 py-2 focus:ring-2 focus:ring-yellow"/>
                        </div>
                        <div>
                            <label class="label">แคลอรี: </label>
                            <input  type="decimal" 
                                v-model="Calories"  class="font-medium rounded-md border-2 border-yellow border-opacity-50y w-full px-3 py-2"/>
                
                        </div>
                        <!-- <div>
                            <label class="label">ประเภทอาหาร: </label>
                            <select id="category"  v-model="selectCategory"  name="category" class="font-medium rounded-md border-2 border-yellow border-opacity-50y w-full px-3 py-2" >  
                                <option v-for="c in Category" :value="Category"  :key="c.CategoryId">{{ c.CategoryName }}</option> 
                            </select>
                          
                        </div> -->
                    </div>
                    <div class=" lg:w-3/5 lg:space-y-1">
                        <!-- <div>
                            <label class="label mt-2">วัตถุดิบ: </label>
                            <textarea rows="4" cols="50" type="text" id="Ingredient" name="Ingredient"
                                     v-model="Ingredient"  class="w-full px-3 py-2 mb-1 h-52 font-medium text-left bg-white border-2 border-yellow border-opacity-50y rounded-md"/>
                                    <p v-if="invalidIngrdient" class="error">"Please enter ingredient"</p>
                        </div> -->
                        <div>
                            <label class="label">วิธีการทำ: </label>
                            <textarea rows="4" cols="50" type="text" id="Preparation" name="Preparation"
                                v-model="Preparation"  class="w-full px-3 py-2 mb-1 h-64 font-medium text-left bg-white border-2 border-yellow border-opacity-50y rounded-md"/>
                            
                        </div>

                    </div>
                </div>
            
                <div class=" flex flex-row justify-center space-x-2 mt-4 mb-4">
                    <button class="bg-yellow hover:bg-amber-400 hover:text-black text-white py-2 px-16 mx-2 rounded text-darkgray text-xl font-medium" @click="updateMenu(MenuId)" >
                        แก้ไข
                    </button>
                </div>
            </div>     
        </div>
    </div>
</template>

<script>
import MenuService from "../service/MenuService.js";
export default {
    props: ["mId"],
    data(){
        return{
            menu: [],
            Category: [],
            MenuName: "",
            Calories: "",
            Preparation: "",
            Ingredient: "",
            selectCategory: null,
            MenuId: this.mId,

        }
    },
    methods: {
        closeModal(){
            this.$emit("close", true);
        },
        retrieveMenu(){
            MenuService.get("/menu/"+this.MenuId)
            .then(response => {
                this.MenuName = response.data.MenuName,
                this.Calories = response.data.Calories,
                this.Preparation = response.data.Preparation,
                this.Ingredient = response.data.Ingredient,
                this.selectCategory = response.data.Category
            })
        },
        updateMenu() {
            const formData = new FormData();
            let edit = {
                MenuId: this.MenuId,
                MenuName: this.MenuName,
                Calories: this.Calories,
                Preparation: this.Preparation,
                Ingredient: this.Ingredient,
                Category: this.selectCategory
            }
            const menuData = JSON.stringify(edit);
            console.log(menuData);
            const blob = new Blob([menuData], {
                type: 'application/json'
            });

            formData.append('json', blob);

            MenuService.put(`/menu`, formData,{
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            }).then(response => {
                if(response.status === 200){
                    alert("Already edited!")
                    this.$router.go()
                }
            })
        },
        listCategory() {
            MenuService.get("/menucategory").then(response => {
                this.Category = response.data;
            })
        },
    },
    created() {
    this.listCategory();
    this.retrieveMenu(); 
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

</style>