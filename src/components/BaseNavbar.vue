<template>
    <div id="nav" class=" w-full flex items-center justify-between flex-wrap bg-yellow fontNoto">
      <div class="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2">
        <div class="flex items-center flex-shrink-0 text-gray-800 mr-16">
          <div class="flex flex-row">
            <router-link to="/">
              <img class="object-cover h-16 w-auto mt-1" alt="logo" src="../assets/logo.png" />
            </router-link>
            <p class="text-3xl font-bold text-white mt-5 ml-3 textShadow">FOODRAND</p>
          </div>
        </div>
      </div>
    
      <div class="menu w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
        <div class="font-bold text-black text-base lg:flex-grow">
          <!-- <p
            class="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-coral1 mr-2">
            หน้าแรก
          </p> -->
          <router-link to="/">
            <p class="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-coral1 mr-2 pb-2">
              แนะนำอาหาร
            </p>
          </router-link>
          <!-- <p
            class="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-coral1 mr-2">
            บทความ
          </p> -->
          <!-- <p
            class="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-coral1 mr-2">
            สุ่มอาหาร
          </p> -->
        </div>
        <!-- <div class="relative mx-auto text-gray-600 lg:block hidden">
          <input class="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
            type="search" name="search" placeholder="Search">
          <button type="submit" class="absolute right-0 top-0 mt-3 mr-2">
            <svg class="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
              version="1.1" id="Capa_1" x="0px" y="0px"
              viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;"
              xml:space="preserve"
              width="512px" height="512px">
              <path
                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
            </svg>
          </button>
        </div> -->
        <router-link to="/login">
          <div class="flex ">
            <font-awesome-icon icon="user-circle" class="block text-md rounded-full ml-2 h-10 w-10 bg-white border-2 border-white lg:mt-0" style="color:#F95335" />
    
            <button type="submit" class="block h-10 text-md px-2 ml-2 py-2 rounded-md text-white bg-coral1 hover:bg-coral2 lg:mt-0">
              เข้าสู่ระบบ
            </button>
          </div>
        </router-link> 
      </div>    


    <!-- <div class="lg:flex lg:items-stretch lg:flex-no-shrink lg:flex-grow">
      <div class="lg:flex lg:items-stretch lg:justify-end ml-auto">
        <router-link to="/">
          <font-awesome-icon icon="user-circle" class="flex-no-grow flex-no-shrink relative leading-normal text-white no-underline flex items-center h-10 w-10 bg-white border-2 border-white rounded-full" style="color:#F95335" />
        </router-link> 
        <button type="submit" class="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-white no-underline flex items-center bg-coral1 hover:bg-coral2 rounded-md">
          เข้าสู่ระบบ
        </button> 
      </div>
    </div> -->
        <slot></slot>
    </div>
    <router-view/>
</template>