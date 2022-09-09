<template>
  <div class="h-full fontNoto bg-gray1 overflow-x-hidden">
    <base-navbar></base-navbar>
    <section class="relative mx-auto">
      <nav class="flex justify-between bg-white text-black w-screen shadow-lg">
        <div class="px-5 py-6 flex w-full items-center">
          <ul class="hidden md:flex px-4 mx-auto font-heading space-x-12">
            <!-- <router-link to="/">
                <div><a class="hover:text-coral1">หน้าแรก</a></div>
              </router-link> -->
            <router-link to="/user-recommend-menu">
              <div><a class="hover:text-coral1">แนะนำอาหาร</a></div>
            </router-link>
            <!-- <router-link to="/">
                <div><a class="hover:text-coral1">บทความ</a></div>
              </router-link> -->
            <router-link to="/user-random">
              <div><a class="hover:text-coral1">สุ่มอาหาร</a></div>
            </router-link>
          </ul>
        </div>
      </nav>
    </section>
    <div class="flex justify-center">
      <div class="w-5/6 h-auto p-6 bg-white flex justify-center mt-12 mb-10">
        <div
          class="
            bg-yellow1
            w-2/5
            pl-6
            pt-6
            pr-6
            rounded-lg
            flex flex-col
            justify-center
          "
        >
          <!-- <img src="../assets/random.png" 
                class="object-cover h-auto w-auto z-0"/>        -->
          <div v-if="showImg">
            <div class="flex justify-center">
              <img :src="imgSrc" class="object-cover h-64 w-auto" />
            </div>
            <div class="flex justify-center mt-4">
              <input
                type="text"
                class="
                  font-medium
                  text-center
                  rounded-md
                  border-2 border-yellow border-opacity-50y
                  w-48
                  px-3
                  py-2
                "
                v-model="randomMenu.Menuname"
                disabled
              />
            </div>
            <div class="flex flex-col justify-center mt-8">
              <p class="text-center">
                คุณต้องการเก็บประวัติผลการสุ่มเมนูหรือไม่
              </p>
              <div class="flex justify-center space-x-3 mt-2">
                <button
                  @click="addMenuHistory()"
                  class="bg-green px-3 py-2 h-10 w-20 rounded-3xl font-semibold"
                >
                  ใช่
                </button>
                <button
                  @click="clickNo()"
                  class="
                    bg-red-500
                    px-3
                    py-2
                    h-10
                    w-20
                    rounded-3xl
                    font-semibold
                  "
                >
                  ไม่
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="w-2/5 flex justify-center">
          <div class="bg-yellow1 pl-6 pt-6 pr-6 rounded-lg items-center">
            <div class="grid grid-cols-2 gap-x-8 gap-y-4">
              <div
                v-for="c in Category"
                :key="c.CategoryId"
                class="flex flex-row"
              >
                <input
                  type="radio"
                  id="category"
                  :value="c"
                  v-model="selectCategory"
                  name="category"
                  class="w-5 h-5 accent-coral1"
                />
                <p class="pl-1">{{ c.CategoryName }}</p>
              </div>
            </div>
            <div class="my-4 flex justify-center">
              <button
                @click="clickCategory()"
                class="bg-green px-3 py-2 h-10 w-20 rounded-3xl font-semibold"
              >
                สุ่มเมนู
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <base-footer></base-footer>
  </div>
</template>

<script>
import MenuService from "../service/MenuService.js";
import authHeader from "../service/AuthenHeader";

export default {
  components: {},
  data() {
    return {
      Category: [],
      menuInCategory: [],
      randomMenu: "",
      selectCategory: null,
      showImg: false,
      imgSrc: "",
    };
  },
  methods: {
    listCategory() {
      MenuService.get("/menucategory").then((response) => {
        this.Category = response.data;
      });
    },

    clickNo() {
      this.showImg = false;
    },
    clickCategory() {
      MenuService.get("/menu/category/" + this.selectCategory.CategoryId).then(
        (response) => {
          for (let each in response.data) {
            this.menuInCategory.push({
              Menuname: response.data[each].MenuName,
              MenuImg: response.data[each].MenuImg,
            });
          }
          var random = Math.floor(Math.random() * this.menuInCategory.length);
          this.randomMenu = this.menuInCategory[random];
          this.imgSrc = `http://localhost:3000/images/${this.randomMenu.MenuImg}`;
          this.showImg = true;
        }
      );
    },
    addMenuHistory() {
      const formData = new FormData();
      let add = {
        MenuName: this.randomMenu.Menuname,
      };
      const menuData = JSON.stringify(add);
      const blob = new Blob([menuData], {
        type: "application/json",
      });
      formData.append("Menuname", blob);
      MenuService.post("/menuhistory", add, {
        headers: {
          Authorization: authHeader().Authorization,
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          if (response.status === 201) {
            alert("เพิ่มเมนูของคุณเข้าสู่ประวัติเรียบร้อยแล้ว!");
            this.$router.go;
            this.showImg = false;
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            alert("ต้องเข้าสู่ระบบก่อนทำการเพิ่มเมนู!");
            this.$router.push("/login-user");
          }
        });
    },
  },
  created() {
    this.listCategory();
  },
  computed: {},
};
</script>

<style>
.fontKanit {
  font-family: "Kanit", sans-serif;
}
.fontNoto {
  font-family: "Noto Sans Thai", sans-serif;
}
.textShadow {
  text-shadow: 2px 2px 4px #2b2b2b;
}
.bgIcon {
  color: #f95335;
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