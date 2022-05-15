import { createRouter, createWebHistory } from 'vue-router'
import RegisterPage from '../views/RegisterPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RecipePage from '../views/RecipePage.vue'
import RecommendMenuPage from '../views/RecommendMenuPage.vue'

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
