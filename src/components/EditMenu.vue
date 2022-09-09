<template>
    <div class="fontNoto overflow-x-hidden overflow-y-auto fixed inset-0 z-50 top-20 outline-none focus:outline-none flex justify-center mb-4">
        <div class="h-96 border-0 rounded-md shadow-lg flex flex-col lg:w-3/4 bg-oldrose outline-none focus:outline-none">
            <div class="flex justify-end">
                <button class="close text-black" type="button" @click="closeModal" > X </button>
            </div>
            <div class="felx text-center font-medium text-black text-2xl">
                <p>แก้ไขเมนู</p>
            </div>

            <div class=" bg-oldrose rounded-md px-4 ">
                <div class="lg:flex lg:flex-row justify-around mt-2 lg:space-x-5 sm:flex-col">
                    <div class="mt-2 lg:w-3/5 lg:space-y-2 ">
                        <div>
                            <label class="label">ชื่อเมนู: </label>
                            <input  type="text" id="MenuName" name="MenuName"
                                v-model="MenuName"   class="font-medium rounded-md border-2 border-yellow border-opacity-50y w-full px-3 py-2 focus:ring-2 focus:ring-yellow"/>
                            <p v-if="invalidMenuName" class="error">"กรุณาใส่ชื่อเมนูอาหาร"</p>
                        </div>
                        
                        <div>
                            <label class="label">วัตถุดิบ: </label>
                            <textarea rows="4" cols="50" type="text" id="Ingredients" name="Ingredients"
                                v-model="Ingredients"  class="w-full px-3 py-2 mb-1 h-72 font-medium text-left bg-white border-2 border-yellow border-opacity-50y rounded-md focus:ring-2 focus:ring-yellow"/>
                            <p v-if="invalidIngredients" class="error">"กรุณาใส่วัตถุดิบ"</p>
                        </div>
                    </div>
                    <div class="mt-2 lg:w-3/5 lg:space-y-2">
                        <div>
                            <label class="label">แคลอรี: </label>
                            <input  type="decimal" 
                                v-model="Calories"  class="font-medium rounded-md border-2 border-yellow border-opacity-50y w-full px-3 py-2 focus:ring-2 focus:ring-yellow"/>
                            <p v-if="invalidCalories" class="error">"กรุณาใส่แคลอรี"</p>
                        </div>
                        
                        <div>
                            <label class="label">วิธีการทำ: </label>
                            <textarea rows="4" cols="50" type="text" id="Preparation" name="Preparation"
                                        v-model="Preparation"  class="w-full px-3 py-2 mb-1 h-72 font-medium text-left bg-white border-2 border-yellow border-opacity-50y rounded-md focus:ring-2 focus:ring-yellow"/>
                            <p v-if="invalidPreparation" class="error">"กรุณาใส่วิธีการทำ"</p>
                        </div>
                        
                    </div>
                    
                </div>
                
            
                <div class=" flex flex-row justify-center space-x-2 mt-4 mb-4">
                    <button class="bg-yellow hover:bg-amber-400 hover:text-black text-white py-2 px-16 mx-2 rounded text-darkgray text-xl font-medium" @click="menuForm(MenuId)" >
                        แก้ไขเมนู
                    </button>
                </div>
            </div>     
        </div>
    </div>
</template>

<script>
import MenuService from "../service/MenuService.js";
import authHeader from "../service/AuthenHeader.js"
export default {
    props: ["mId"],
    data(){
        return{
            menu: [],
            Category: [],
            MenuName: "",
            Calories: "",
            Preparation: "",
            Ingredients: "",
            MenuId: this.mId,
            invalidMenuName: false,
            invalidCalories: false,
            invalidPreparation: false,
            invalidIngredients: false,
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
                this.Ingredients = response.data.Ingredients
            })
            
        },
        menuForm() {
            this.invalidMenuName = this.MenuName === "" ? true:false;
            this.invalidCalories = this.Calories === "" ? true:false;
            this.invalidPreparation = this.Preparation === "" ? true : false;
            this.invalidIngredients = this.Ingredients === "" ? true : false;
            if(this.invalidMenuName || this.invalidCalories || this.invalidPreparation || this.invalidIngredients) {
                return;
            }
            this.updateMenu();
        },
        updateMenu() {
            const formData = new FormData();
            let edit = {
                MenuId: this.MenuId,
                MenuName: this.MenuName,
                Calories: this.Calories,
                Preparation: this.Preparation,
                Ingredients: this.Ingredients
            }
            const menuData = JSON.stringify(edit);
            const blob = new Blob([menuData], {
                type: 'application/json'
            });

            formData.append('json', blob);

            MenuService.put(`/menu`, formData,{
                headers: {
                    Authorization: authHeader().Authorization,
                    'Content-Type' : 'multipart/form-data'
                }
            }).then(response => {
                if(response.status === 200){
                    alert("แก้ไขเมนูเรียบร้อยแล้ว!")
                    this.$router.go()
                }
            }).catch(error => {
                if(error.status === 401){
                alert("ต้องเข้าสู่ระบบก่อนทำการแก้ไขเมนู!")
                this.$router.push('/login-admin');
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