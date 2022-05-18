<template>
  <div class="h-screen overflow-y-hidden bg-yellow fontNoto">
    <div class="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
      <div class="flex rounded-3xl shadow-lg w-full sm:w-3/4 lg:w-2/3 bg-white sm:mx-0" style="height: 500px">
        <div class="hidden md:block md:w-2/3">
          <img src="../assets/pic-login.png" class="rounded-l-3xl h-full">
        </div>
        
        <div class="flex flex-col w-full md:w-1/2 p-4">
          <div class="flex flex-col flex-1 justify-center mb-8">
            <div class="flex justify-center mt-3">
              <img src="../assets/logo.png" class="object-cover h-16 w-auto" />
            </div>
            <div class="grid grid-cols-1 divide-y-4 divide-yellow">
              <div class="mb-1">
                <p class="text-2xl text-center font-semibold">เข้าสู่ระบบ</p>
              </div>
              <div class="">
                <p class="text-base text-center font-medium mt-1">มีเมนูในใจแล้วหรือยัง?</p>
                <p class="text-base text-center font-medium ">มาค้นหาเมนูในใจของคุณกับ FOODRAND สิ่</p>
              </div>
            </div>
            <div class="w-full mt-3">
              <form class="form-horizontal w-3/4 mx-auto" method="POST" action="#">
                <div class="flex flex-col mt-2">
                  <p class="text-base text-left font-medium ">ชื่อผู้ใช้งาน</p>
                  <input id="username" type="text" class="flex-grow h-8 px-2 border rounded border-grey-400 bg-gray-200" name="username" value="" >
                </div>
                <div class="flex flex-col mt-2">
                  <p class="text-base text-left font-medium ">รหัสผ่าน</p>
                  <input id="password" type="password" class="flex-grow h-8 px-2 rounded border border-grey-400 bg-gray-200" name="password" required >
                </div>
                <div class="flex justify-between mt-2">
                  <div>
                    <input type="checkbox" name="remember" id="remember" class="mr-2 "> 
                    <label for="remember" class="text-sm text-grey-dark ">จดจำฉันไว้</label>
                  </div>
                  <div>
                    <p class="text-sm text-grey-dark ">ลืมรหัสผ่าน ?</p>
                  </div>
                </div>
                <div class="flex flex-col mt-4">
                  <button type="submit" class="bg-yellow hover:bg-coral text-black hover:text-white text-sm font-semibold py-2 px-4 rounded">
                    เข้าสู่ระบบ
                  </button>
                </div>
              </form>
              <div class="flex flex-row justify-center space-x-1 mt-4">
                <p class="text-xs">
                  ยังไม่มีบัญชีผู้ใช้? 
                </p>
                <p class="no-underline hover:underline text-coral text-xs">
                  สมัครที่นี่
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  components: {

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

</style>