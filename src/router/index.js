import { createRouter, createWebHistory } from 'vue-router'
import RecommendMenuPage from '../views/RecommendMenuPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RecipePage from '../views/RecipePage.vue'

const routes = [
  {
    path: '/',
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/recipe',
    name: 'recipe',
    component: RecipePage
  },
  {
    path: '/recommend-menu',
    name: 'recommend-menu',
    component: RecommendMenuPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
