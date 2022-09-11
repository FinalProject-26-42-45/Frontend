<template>
    <footer class="relative  bg-black fontNoto">
     <div class="container flex flex-col justify-center p-10 lg:pl-24 mx-auto lg:items-start md:flex-row lg:divide-x-2 md:divide-x-2 divide-yellow">
        <div class="w-full lg:w-1/3 md:w-1/2 mb-8">
            <router-link to="/">
              <h1 class="text-lg font-bold tracking-widest text-white no-underline">About Foodrand
              </h1>
            </router-link>
            <img src="../assets/line.png" class="object-cover h-1 w-16" />
            <nav class="list-none w-full">
              <router-link to="/">
                <li>
                  <p class="mt-3 text-sm text-white break-normal no-underline">www.foodrand.net</p>
                </li>
              </router-link>
              <router-link to="/">
                <li>
                  <p class="text-sm text-white">เป็นเว็บแอปพลิเคชั่นสำหรับคนที่ไม่ทราบว่าจะรับประทานอะไร</p>
                </li>
              </router-link>
              <router-link to="/">
                <li>
                  <p class="text-sm text-white">และช่วยตัดสินใจในการเลือกเมนูอาหาร</p>
                </li>
              </router-link>
            </nav>
        </div>
        <div class="w-full  lg:w-1/3 md:w-1/2 md:pl-4 lg:pl-6">
            <router-link to="/">
              <h1 class="text-lg font-bold tracking-widest text-white">Recent Post</h1>
            </router-link>
            <img src="../assets/line.png" class="object-cover h-1 w-16" />
              <nav class="mb-8 list-none">
                <router-link to="/">
                <li>
                    <p class="mt-3 text-sm text-white">6 สิ่งที่จะเกิดขึ้นเมื่อหยุดทานมื้อดึก</p>
                </li>
                </router-link>
                <router-link to="/">
                  <li>
                    <p class="text-sm text-white">อาหารปราศจากกลูเตน</p>
                  </li>
                </router-link>
                <router-link to="/">
                <li>
                    <p class="text-sm text-white">อาหารทานเล่นที่มีค่าดัชนีน้ำตาลต่ำ</p>
                </li>
                </router-link>
              </nav>
        </div>
        <div class="w-full lg:w-1/3 md:w-1/2 md:pl-4 lg:pl-6">
          <router-link to="/">
            <h1 class="text-lg font-bold tracking-widest text-white">Contact Us</h1>
          </router-link>
          <img src="../assets/line.png" class="object-cover h-1 w-16" />
            <nav class="mb-8 list-none">
              <router-link to="/">
                <li>
                  <p class="mt-3 text-sm text-white">Jeong Chedah</p>
                </li>
              </router-link>
              <router-link to="/">
                <li>
                  <p class="text-sm text-white">Jam</p>
                </li>
              </router-link>
              <router-link to="/">
                <li>
                  <p class="text-sm text-white">Apple</p>
                </li>
              </router-link>
            </nav>
        </div>
    </div>
    <div class="absolute bottom-0 right-0 lg:inline-block sm:hidden md:hidden w-full lg:w-1/4 md:w-1/2 lg:pl-44">
      <img class="object-cover h-40 w-auto " alt="picfooter" src="../assets/pic-footer.png" />
    </div>         
  </footer>
  <slot></slot>
</template>