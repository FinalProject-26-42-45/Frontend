<template>
  <!-- <div>
    <router-link to="/register">ลงทะเบียน</router-link> |
    <router-link to="/login">เข้าสู่ระบบ</router-link> |
    <router-link to="/recipe">สูตรอาหาร</router-link> |
    <router-link to="/recommend-menu">เมนูแนะนำ</router-link>
  </div> -->
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
