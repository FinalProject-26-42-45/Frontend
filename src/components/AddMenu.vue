<template>
    <div>
        <div class="fontNoto overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none flex justify-center items-center mb-4">
            <div class="h-96 border-0 rounded-md shadow-lg flex flex-col lg:w-2/3 bg-oldrose outline-none focus:outline-none">
                <div class="flex justify-end">
                    <button class="close text-black pt-2 pr-2" type="button" @click="closeModal" > X </button>
                </div>
                <div class="flex justify-center md:justify-center">
                    <h3 class="text-2xl uppercase text-black">เมนูอาหาร</h3>
                </div>

                <div class=" bg-oldrose rounded-md px-4 ">
                        <div class="lg:flex lg:flex-row justify-around mt-2 lg:space-x-5 sm:flex-col">
                            <div class="mt-2 lg:w-2/5 lg:space-y-2 ">
                                <div>
                                    <label class="label">ชื่อเมนู: </label>
                                    <input  type="text" id="MenuName" name="MenuName"
                                    v-model="MenuName"   class="font-medium rounded-md border-2 border-yellow border-opacity-50y w-full px-3 py-2 focus:ring-2 focus:ring-yellow"/>
                                    <p v-if="invalidMenuName" class="error">"Please enter menu name"</p>
                                </div>
                                <div>
                                    <label class="label">แคลอรี: </label>
                                    <input  type="number" 
                                    v-model="Calories"  class="font-medium rounded-md border-2 border-yellow border-opacity-50y w-full px-3 py-2"/>
                                    <p v-if="invalidCalories" class="error">"Please enter calories"</p>
                                </div>
                                
                                <div class="flex flex-col">
                                    <label class="label text-left">เลือกรูปภาพ: </label>
                                    <input type="file" class="text-black" accept="product.productImg/png" @change="selectPic" />
                                    <div class="mt-2">
                                        <img :src="imageUpload" class="object-cover lg:h-52 w-full sm:h-36" />
                                    </div>
                                </div>
                        
                            </div>
                            <div class="mt-2 lg:w-3/5 lg:space-y-2">
                                <div>
                                    <label class="label">ประเภทอาหาร: </label>
                                    <select id="category"  v-model="selectCategory"  name="category" class="font-medium rounded-md border-2 border-yellow border-opacity-50y w-full px-3 py-2" >  
                                        <option v-for="c in Category" :value="c"  :key="c.CategoryId">{{ c.CategoryName }}</option> 
                                    </select>
                                    <p v-if="invalidCategory" class="error">"Please select category"</p>
                                </div>
                                <div>
                                    <label class="label">วิธีการทำ: </label>
                                    <textarea rows="4" cols="50" type="text" id="Preparation" name="Preparation"
                                     v-model="Preparation"  class="w-full px-3 py-2 mb-1 h-80 font-medium text-left bg-white border-2 border-yellow border-opacity-50y rounded-md"/>
                                    <p v-if="invalidPreparation" class="error">"Please enter preparation"</p>
                                </div>
                                <!-- <div>
                                    <label class="label mt-2">วัตถุดิบ: </label>
                                    <textarea rows="4" cols="50" type="text" id="Ingredient" name="Ingredient"
                                     v-model="Ingredient"  class="w-full px-3 py-2 mb-1 h-52 font-medium text-left bg-white border-2 border-yellow border-opacity-50y rounded-md"/>
                                    <p v-if="invalidIngrdient" class="error">"Please enter ingredient"</p>
                                </div> -->
                                
                            </div>
                        </div>
                        
                        <div class=" flex flex-row justify-center space-x-2 mt-4 mb-4">
                            <button class="bg-green-500 hover:bg-green-600 hover:text-black text-white py-2 px-16 mx-2 rounded text-darkgray text-xl font-medium" @click="menuForm">
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
export default {
    emits: ["close", "save-menu"],
    data() {
        return {
            imageUpload: this.imageDb ? this.imageDb : imageUpload,
            Category: [],
            Menu: [],
            ImageFile: null,
            MenuImg: null,
            MenuName: "",
            Calories: "",
            Preparation: "",
            selectCategory: null,
            image: null,
            invalidMenuName: false,
            invalidCalories: false,
            invalidPreparation: false,
            invalidCategory: false,

        }
    },
    methods: {
        menuForm() {
            this.invalidMenuName = this.MenuName === "" ? true:false;
            this.invalidCalories = this.Calories === "" ? true:false;
            this.invalidPreparation = this.Preparation === "" ? true : false;
            this.invalidCategory= this.selectCategory === null ? true:false;
            console.log(this.selectCategory);
            if(this.invalidMenuName || this.invalidCalories || this.invalidPreparation || this.invalidCategory ) {
                console.log('invalidMenuName',this.invalidMenuName);
                console.log('invalidCalories',this.invalidCalories );
                console.log('invalidPreparation',this.invalidPreparation);
                console.log('invalidCategory',this.invalidCategory);
                return;
            }
            this.addMenu();
        },
        addMenu(){
            const formData = new FormData();
            let add = {
                MenuName: this.MenuName,
                Calories: this.Calories,
                Preparation: this.Preparation,
                menucategory: this.selectCategory   
            }
            const menuData = JSON.stringify(add);
            const blob = new Blob([menuData], {
                type: 'application/json'
            });
            formData.append('file', this.ImageFile);
            formData.append('json', blob);

            console.log(formData);

            console.log(this.ImageFile);

            MenuService.post("/menu", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                }).then(response => {
                if(response.status === 201){
                    alert("Menu was add!")
                    this.$router.go()
                }
            })
            // }).then(response => {
            //     response.status === 200 ? alert("Menu was add!") : alert("Error")
            // }).catch(error => {
            // let errorObject=JSON.parse(JSON.stringify(error));
            // console.log(errorObject);
            // })     
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