<template>
    <div>
        <div class="fontNoto overflow-x-hidden overflow-y-auto fixed inset-0 z-50 top-10 outline-none focus:outline-none flex justify-center mb-4">
            <div class="h-96 border-0 rounded-md shadow-lg flex flex-col lg:w-2/3 bg-oldrose outline-none focus:outline-none">
                <div class="flex justify-end">
                    <button class="close text-black pt-2 pr-2" type="button" @click="closeModal" > X </button>
                </div>
                <div class="flex justify-center md:justify-center">
                    <h3 class="text-2xl uppercase text-black">เมนูอาหาร</h3>
                </div>

                <div class=" bg-oldrose rounded-md px-4 ">
                        <div class="lg:flex lg:flex-row justify-around mt-2 lg:space-x-5 sm:flex-col">
                            <div class="mt-2 lg:w-2.5/5 lg:space-y-2 ">
                                <div>
                                    <label class="label">ชื่อเมนู: </label>
                                    <input  type="text" id="MenuName" name="MenuName" @keyup="validateMenuName"
                                    v-model="MenuName"   class="font-medium rounded-md border-2 border-yellow border-opacity-50y w-full px-3 py-2 focus:ring-2 focus:ring-yellow"/>
                                    <p v-if="invalidMenuName" class="error">"กรุณาใส่ชื่อเมนูอาหาร"</p>
                                    <p class="error">{{ duplicateMenuName }}</p>
                                </div>
                                <div>
                                    <label class="label mt-2">แคลอรี: </label>
                                    <input  type="number" 
                                    v-model="Calories"  class="font-medium rounded-md border-2 border-yellow border-opacity-50y w-full px-3 py-2 focus:ring-2 focus:ring-yellow"/>
                                    <p v-if="invalidCalories" class="error">"กรุณาใส่แคลอรี"</p>
                                </div>

                                <!-- <div>
                                    <label class="label mt-2" for="Multiselect">ประเภทอาหาร: </label>
                                    <select id="category"  
                                            v-model="selectCategory"  
                                            name="category" 
                                            class="font-medium rounded-md border-2 border-yellow border-opacity-50y w-full px-3 py-2"
                                            multiple>  
                                        <option v-for="c in Category" :value="c"  :key="c.CategoryId">{{ c.CategoryName }}</option> 
                                    </select>
                                    <p v-if="invalidCategory" class="error">"กรุณาเลือกประเภทของเมนู"</p>
                                </div> -->
                                <div>
                                    <label class="label mt-2">ประเภทอาหาร: </label>
                                    <div class="grid grid-cols-3 justify-items-start">
                                    <div v-for="c in Category" :key="c.CategoryId" class="flex flex-row">
                                    <input type="checkbox" id="category"  
                                            :value="c"  
                                            v-model="selectCategory"  
                                            name="category" 
                                            class="w-5 h-5 accent-yellow"
                                            />  
                                    <p class="pl-1 ">{{ c.CategoryName }}</p>     
                                    </div>
                                    </div>

                                    <p v-if="invalidCategory" class="error">"กรุณาเลือกประเภทของเมนู"</p>
                                </div>
                                
                                <div class="flex flex-col">
                                    <label class="label text-left lg:mt-3">เลือกรูปภาพ: </label>
                                    <input type="file" class="text-black" @change="selectPic" />
                                    <div class=" mt-4">
                                        <img :src="imageUpload" class="object-cover lg:h-80 w-full sm:h-36" />
                                    </div>
                                </div>
                        
                            </div>
                            <div class="mt-2 lg:w-3/5 lg:space-y-2">
                                <div>
                                    <label class="label">วัตถุดิบ: </label>
                                    <textarea rows="4" cols="50" type="text" id="Ingredients" name="Ingredients"
                                     v-model="Ingredients"  class="w-full px-3 py-2 mb-1 h-80 font-medium text-left bg-white border-2 border-yellow border-opacity-50y rounded-md focus:ring-2 focus:ring-yellow"/>
                                    <p v-if="invalidIngredients" class="error">"กรุณาใส่วัตถุดิบ"</p>
                                </div>

                                <div>
                                    <label class="label lg:mt-8">วิธีการทำ: </label>
                                    <textarea rows="4" cols="50" type="text" id="Preparation" name="Preparation"
                                     v-model="Preparation"  class="w-full px-3 py-2 mb-1 h-96 font-medium text-left bg-white border-2 border-yellow border-opacity-50y rounded-md focus:ring-2 focus:ring-yellow"/>
                                    <p v-if="invalidPreparation" class="error">"กรุณาใส่วิธีการทำ"</p>
                                </div>
                                
                                
                            </div>
                        </div>
                        
                        <div class=" flex flex-row justify-center space-x-2 mt-4 mb-4">
                            <button class="bg-green hover:text-white text-black py-2 px-16 mx-2 rounded text-darkgray text-xl font-medium" @click="menuForm">
                                เพิ่มเมนู
                            </button>
                        </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import imageUpload from "../assets/imageupload.png";
import MenuService from '../service/MenuService.js';
import authHeader from '../service/AuthenHeader';
export default {
    emits: ["close", "save-menu"],
    data() {
        return {
            imageUpload: this.imageDb ? this.imageDb : imageUpload,
            Category: [],
            Menu: [],
            menuName: [],
            ImageFile: null,
            MenuImg: null,
            MenuName: "",
            Calories: "",
            Preparation: "",
            Ingredients: "",
            selectCategory: [],
            image: null,
            invalidMenuName: false,
            invalidCalories: false,
            invalidPreparation: false,
            invalidCategory: false,
            invalidIngredients: false,
            duplicateMenuName: "",
        }
    },
    methods: {
        menuForm() {
            this.invalidMenuName = this.MenuName === "" ? true:false;
            this.invalidCalories = this.Calories === "" ? true:false;
            this.invalidPreparation = this.Preparation === "" ? true : false;
            this.invalidIngredients = this.Ingredients === "" ? true : false;
            this.invalidCategory= this.selectCategory.length === 0 ? true:false;
            if(this.invalidMenuName || this.invalidCalories || this.invalidPreparation || this.invalidIngredients || this.invalidCategory  ) {
                return;
            }
            this.addMenu();
        },
        validateMenuName(){
            if(!this.MenuName){
                this.duplicateMenuName = ''
                return;
            }
            const res = this.menuName ;
            this.duplicateMenuName = (res.includes(this.MenuName)) ? "ชื่อเมนูนี้มีอยู่แล้ว" : "" ;
        },
        retrieveMenu() {
            MenuService.get("/menu")
                .then(response => {
                for(let each in response.data){
                    this.menuName.push(response.data[each].MenuName);
                }
            })
                
        },
        addMenu(){
            const formData = new FormData();
            let add = {
                MenuName: this.MenuName,
                Calories: this.Calories,
                Preparation: this.Preparation,
                Ingredients: this.Ingredients,
                menucategory: this.selectCategory
                
            }
            const menuData = JSON.stringify(add);
            const blob = new Blob([menuData], {
                type: 'application/json'
            });
            formData.append('file', this.ImageFile);
            formData.append('json', blob);
            MenuService.post("/menu", formData, {
                headers: {
                    Authorization: authHeader().Authorization,
                    'Content-Type' : 'multipart/form-data'
                }
                }).then(response => {
                if(response.status === 201){
                    alert("เพิ่มเมนูเรียบร้อยแล้ว!")
                    this.$router.go()
                }
            }).catch(error => {
                if(error.response.status === 401){
                alert("ต้องเข้าสู่ระบบก่อนทำการเพิ่มเมนู!")
                this.$router.push('/login-admin');
                }
            })   
        },
        
        closeModal(){
            this.$emit("close", true);
        },
        selectPic(p){
            const file = p.target.files[0];
            this.MenuImg = file.name;
            this.ImageFile = file;
            let reader = new FileReader();
            reader.onload = (p) => {
                this.imageUpload = p.target.result;
            };
            reader.readAsDataURL(file);
        },
        listCategory(){
            MenuService.get("/menucategory").then(response => {
                this.Category = response.data;
            });
        },
    },
    created(){
        this.listCategory();
        this.retrieveMenu(); 
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

</style>