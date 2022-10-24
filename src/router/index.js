import { createRouter, createWebHistory } from 'vue-router'
import UserRecommendMenuPage from '../views/UserRecommendMenuPage.vue'
import UserRegisterPage from '../views/UserRegisterPage.vue'
import UserLoginPage from '../views/UserLoginPage.vue'
import UserRandomPage from '../views/UserRandomPage.vue'
import UserRandomMenuPage from '../views/UserRandomMenuPage.vue'
import UserRandomMenuCustomPage from '../views/UserRandomMenuCustomPage.vue'
import UserProfilePage from '../views/UserProfilePage.vue'
import UserMenuHistoryPage from '../views/UserMenuHistoryPage.vue'
import UserStatisticRandomMenuPage from '../views/UserStatisticRandomMenuPage.vue'
import AdminLoginPage from '../views/AdminLoginPage.vue'
import AdminPage from '../views/AdminPage.vue'
import AdminPageUser from '../views/AdminPageUser.vue'
import AnonymousRandomMenuPage from '../views/AnonymousRandomMenuPage.vue'
import AnonymousRecommendMenuPage from '../views/AnonymousRecommendMenuPage.vue'
import AnonymousStatisticsRandomMenuPage from '../views/AnonymousStatisticsRandomMenuPage.vue'


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
    path: '/admin-user',
    name: 'admin-user',
    component: AdminPageUser,
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
    component: UserRecommendMenuPage,
    beforeEnter: (to, from, next) => {
      const role = localStorage.getItem("role");
      const login = localStorage.getItem("accessToken");    
      if (login && role == 2) {
        next();
        
      }else {
        next("/login-user");
        alert("คุณไม่มีสิทธิ์เข้าถึงหน้านี้")
      }   
    }
  },

  {
    path: '/user-random',
    name: 'user-random',
    component: UserRandomPage,
    beforeEnter: (to, from, next) => {
      const role = localStorage.getItem("role");
      const login = localStorage.getItem("accessToken");    
      if (login && role == 2) {
        next();
        
      }else {
        next("/login-user");
        alert("คุณไม่มีสิทธิ์เข้าถึงหน้านี้")
      }   
    }
  },
  

  {
    path: '/user-random-menu',
    name: 'user-random-menu',
    component: UserRandomMenuPage,
    beforeEnter: (to, from, next) => {
      const role = localStorage.getItem("role");
      const login = localStorage.getItem("accessToken");    
      if (login && role == 2) {
        next();
        
      }else {
        next("/login-user");
        alert("คุณไม่มีสิทธิ์เข้าถึงหน้านี้")
      }   
    }
  },

  {
    path: '/user-random-menu-custom',
    name: 'user-random-menu-custom',
    component: UserRandomMenuCustomPage,
    beforeEnter: (to, from, next) => {
      const role = localStorage.getItem("role");
      const login = localStorage.getItem("accessToken");    
      if (login && role == 2) {
        next();
        
      }else {
        next("/login-user");
        alert("คุณไม่มีสิทธิ์เข้าถึงหน้านี้")
      }   
    }
  },

  {
    path: '/user-profile',
    name: 'user-profile',
    component: UserProfilePage,
    beforeEnter: (to, from, next) => {
      const role = localStorage.getItem("role");
      const login = localStorage.getItem("accessToken");    
      if (login && role == 2) {
        next();
        
      }else {
        next("/login-user");
        alert("คุณไม่มีสิทธิ์เข้าถึงหน้านี้")
      }   
    }
  },

  {
    path: '/user-menu-history',
    name: 'user-menu-history',
    component: UserMenuHistoryPage,
    beforeEnter: (to, from, next) => {
      const role = localStorage.getItem("role");
      const login = localStorage.getItem("accessToken");    
      if (login && role == 2) {
        next();
        
      }else {
        next("/login-user");
        alert("คุณไม่มีสิทธิ์เข้าถึงหน้านี้")
      }   
    }
  },

  {
    path: '/user-statistic-random-menu',
    name: 'user-statistic-random-menu',
    component: UserStatisticRandomMenuPage,
    beforeEnter: (to, from, next) => {
      const role = localStorage.getItem("role");
      const login = localStorage.getItem("accessToken");    
      if (login && role == 2) {
        next();
        
      }else {
        next("/login-user");
        alert("คุณไม่มีสิทธิ์เข้าถึงหน้านี้")
      }   
    }
  },

  {
    path: '/anonymous-random-menu',
    name: 'anonymous-random-menu',
    component: AnonymousRandomMenuPage,
    props: true
  },

  {
    path: '/anonymous-recommend-menu',
    name: 'anonymous-recommend-menu',
    component: AnonymousRecommendMenuPage
  },

  {
    path: '/',
    name: 'anonymous-statistics-random-menu',
    component: AnonymousStatisticsRandomMenuPage
  },

  



]

const router = createRouter({
  history: createWebHistory(), //(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "active"
})

export default router
