import { createRouter, createWebHistory } from 'vue-router'
import RecommendMenuPage from '../views/RecommendMenuPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import LoginPage from '../views/LoginPage.vue'
import LoginAdminPage from '../views/LoginAdminPage.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
