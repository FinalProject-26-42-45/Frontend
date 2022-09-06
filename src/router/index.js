import { createRouter, createWebHistory } from 'vue-router'
import RecommendMenuPage from '../views/RecommendMenuPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import LoginPage from '../views/LoginPage.vue'
import LoginAdminPage from '../views/LoginAdminPage.vue'
import AdminPage from '../views/AdminPage.vue'
import SelectCategoryPage from '../views/SelectCategoryPage.vue'
import RandomMenuPage from '../views/RandomMenuPage.vue'

const routes = [
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/login-admin',
    name: 'login-admin',
    component: LoginAdminPage
  },
  {
    path: '/',
    name: 'recommend-menu',
    component: RecommendMenuPage
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
    path: '/select-category',
    name: 'select-category',
    component: SelectCategoryPage
  },
  {
    path: '/random-menu',
    name: 'random-menu',
    component: RandomMenuPage
  },


]

const router = createRouter({
  history: createWebHistory(), //(process.env.BASE_URL),
  routes
})

export default router
