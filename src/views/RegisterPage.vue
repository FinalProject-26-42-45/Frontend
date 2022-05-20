<template>
  <div class="h-screen overflow-y-hidden bg-coral2 fontNoto">
    <div class="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
      <div class="flex rounded-3xl drop-shadow-xl w-full lg:w-2/3 h-auto overflow-auto bg-white sm:mx-0">
        
        <div class="flex flex-col w-full md:w-2/3 px-2 mb-3">
          <div class="flex flex-col flex-1 justify-center">
            <div class="inset-0 top-4 flex justify-center mt-3">
              <img src="../assets/logo.png" class="object-cover h-16 w-auto" />
            </div>
            <div class="grid grid-cols-1 divide-y-4 divide-yellow">
              <div class="mb-1">
                <p class="text-lg text-center font-semibold">ลงทะเบียน</p>
                <p class="text-base text-center font-medium">เพื่อเข้าถึงฟีเจอร์มากมาย</p>
              </div>
            
              <div class="w-full">
                <form class="form-horizontal w-3/4 mx-auto p-2">
                  <div class="lg:flex lg:flex-row lg:space-x-3 md:flex md:flex-col sm:flex sm:flex-col">
                    <div class="flex flex-col mt-1">
                      <p class="text-sm text-left font-medium ">ชื่อจริง</p>
                      <input id="firstname" type="text" class="flex-grow h-7 px-2 border rounded border-grey-400 bg-gray-200" name="firstname" value="" required >
                    </div>
                    <div class="flex flex-col mt-1">
                      <p class="text-sm text-left font-medium ">นามสกุล</p>
                      <input id="lastname" type="text" class="flex-grow h-7 px-2 rounded border border-grey-400 bg-gray-200" name="lastname" value="" required >
                    </div>
                  </div>

                  <div class="lg:flex lg:flex-row lg:space-x-3 md:flex md:flex-col sm:flex sm:flex-col">
                    <div class="flex flex-col mt-1">
                      <p class="text-sm text-left font-medium ">อีเมล์</p>
                      <input id="email" type="email" class="flex-grow h-7 px-2 border rounded border-grey-400 bg-gray-200" name="email" value="" required >
                    </div>
                    <div class="flex flex-col mt-1">
                      <p class="text-sm text-left font-medium ">ชื่อผู้ใช้งาน</p>
                      <input id="username" type="text" class="flex-grow h-7 px-2 rounded border border-grey-400 bg-gray-200" name="username" value="" required >
                    </div>
                  </div>

                  <div class="lg:flex lg:flex-row lg:space-x-3 md:flex md:flex-col sm:flex sm:flex-col">
                    <div class="flex flex-col mt-1">
                      <p class="text-sm text-left font-medium ">รหัสผ่าน</p>
                      <input id="password" type="password" class="flex-grow h-7 px-2 border rounded border-grey-400 bg-gray-200" name="password" value="" required>
                    </div>
                    <div class="flex flex-col mt-1">
                      <p class="text-sm text-left font-medium ">ยืนยันรหัสผ่าน</p>
                      <input id="passwordConfirm" type="password" class="flex-grow h-7 px-2 rounded border border-grey-400 bg-gray-200" name="passwordConfirm" value="" required >
                    </div>
                  </div>

                  <div class="lg:flex lg:flex-row lg:space-x-3 md:flex md:flex-col sm:flex sm:flex-col">
                    <div class="flex flex-col mt-1">
                      <p class="text-sm text-left font-medium ">เบอร์โทรศัพท์</p>
                      <input id="tel" type="number" class="flex-grow h-7 px-2 border rounded border-grey-400 bg-gray-200" name="tel" value="" required>
                    </div>
                    <div class="flex flex-col mt-1">
                      <p class="text-sm text-left font-medium ">วัน/เดือน/ปีเกิด</p>
                      <input id="birthday" type="Date" class="flex-grow h-7 lg:w-52 px-2 rounded border border-grey-400 bg-gray-200" name="dirthday" required >
                    </div>
                  </div>

                  <div class="lg:flex lg:flex-row lg:space-x-3 md:flex md:flex-col sm:flex sm:flex-col">
                    <div class="flex flex-col mt-1">
                      <p class="text-sm text-left font-medium ">เพศ</p>
                      <input id="gender" type="text" class="flex-grow h-7 px-2 border rounded border-grey-400 bg-gray-200" name="gender" value="" required >
                    </div>
                    <div class="flex flex-col mt-1">
                      <p class="text-sm text-left font-medium ">ศาสนา</p>
                      <input id="religion" type="text" class="flex-grow h-7 px-2 rounded border border-grey-400 bg-gray-200" name="religion" value="" required >
                    </div>
                  </div>

                  <div class="flex flex-col mt-1">
                    <p class="text-sm text-left font-medium ">อาหารที่แพ้</p>
                    <div class="flex justify-start space-x-4">
                      <div>
                        <input type="checkbox" name="egg" id="egg" class="mr-1 "> 
                        <label for="egg" class="text-xs text-grey-dark ">ไข่</label>
                      </div>

                      <div>
                        <input type="checkbox" name="milk" id="milk" class="mr-1 "> 
                        <label for="milk" class="text-xs text-grey-dark ">นม</label>
                      </div>

                      <div>
                        <input type="checkbox" name="nut" id="nut" class="mr-1 "> 
                        <label for="nut" class="text-xs text-grey-dark ">ถั่ว</label>
                      </div>

                      <div>
                        <input type="checkbox" name="wheat" id="wheat" class="mr-1 "> 
                        <label for="wheat" class="text-xs text-grey-dark ">ข้าวสาลี</label>
                      </div>

                      <div>
                        <input type="checkbox" name="seafood" id="seafood" class="mr-1 "> 
                        <label for="seafood" class="text-xs text-grey-dark ">อาหารทะเล</label>
                      </div>

                      <div>
                        <input type="checkbox" name="fish" id="fish" class="mr-1 "> 
                        <label for="fish" class="text-xs text-grey-dark ">ปลา</label>
                      </div>
                    </div>
                    
                  </div>

                  <div class="flex flex-col mt-2">
                    <button type="submit" class="bg-yellow hover:bg-coral1 text-black hover:text-white text-sm font-semibold py-2 px-4 rounded">
                      ลงทะเบียน
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="hidden md:block md:w-1/2">
          <img src="../assets/pic-register.png" class="rounded-r-3xl h-full">
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