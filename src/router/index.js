import { createRouter, createWebHistory } from 'vue-router'
import UserRecommendMenuPage from '../views/UserRecommendMenuPage.vue'
import UserRegisterPage from '../views/UserRegisterPage.vue'
import UserLoginPage from '../views/UserLoginPage.vue'
import UserRandomPage from '../views/UserRandomPage.vue'
import UserSelectCategoryPage from '../views/UserSelectCategoryPage.vue'
import UserRandomMenuPage from '../views/UserRandomMenuPage.vue'
import UserRandomMenuCustomPage from '../views/UserRandomMenuCustomPage.vue'
import AdminLoginPage from '../views/AdminLoginPage.vue'
import AdminPage from '../views/AdminPage.vue'
import AnonymousSelectCategoryPage from '../views/AnonymousSelectCategoryPage.vue'
import AnonymousRandomMenuPage from '../views/AnonymousRandomMenuPage.vue'
import AnonymousRecommendMenuPage from '../views/AnonymousRecommendMenuPage.vue'


const routes = [
  {
    path: '/login-admin',
    name: 'login-admin',
    component: AdminLoginPage
  },

  {
    path: '/admin-manage',
    name: 'admin-manage',
    component: AdminPage,
    beforeEnter: (to, from, next) => {
      const role = localStorage.getItem("role");
      const login = localStorage.getItem("accessToken");    
      if (login && role == 1) {
        next();
        
      }else {
        next("/login-admin");
        alert("คุณไม่มีสิทธิ์เข้าถึงหน้านี้")
      } 
      
    }
  }, 

  {
    path: '/user-register',
    name: 'user-register',
    component: UserRegisterPage
  },

  {
    path: '/login-user',
    name: 'login-user',
    component: UserLoginPage
  },

  {
    path: '/user-recommend-menu',
    name: 'user-recommend-menu',
    component: UserRecommendMenuPage
  },

  {
    path: '/user-random',
    name: 'user-random',
    component: UserRandomPage
  },
  
  {
    path: '/user-select-category',
    name: 'user-select-category',
    component: UserSelectCategoryPage
  },

  {
    path: '/user-random-menu',
    name: 'user-random-menu',
    component: UserRandomMenuPage
  },

  {
    path: '/user-random-menu-custom',
    name: 'user-random-menu-custom',
    component: UserRandomMenuCustomPage
  },
  
  {
    path: '/anonymous-select-category',
    name: 'anonymous-select-category',
    component: AnonymousSelectCategoryPage,
    props: true
  },
  {
    path: '/anonymous-random-menu',
    name: 'anonymous-random-menu',
    component: AnonymousRandomMenuPage,
    props: true
  },

  {
    path: '/',
    name: 'anonymous-recommend-menu',
    component: AnonymousRecommendMenuPage
  },

  



]

const router = createRouter({
  history: createWebHistory(), //(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'exact-active-link'
})

export default router
