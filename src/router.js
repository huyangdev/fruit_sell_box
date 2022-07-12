import { createRouter, createWebHashHistory } from 'vue-router'
// import Index from "./view/list/Index"
import MainLayout from "@/views/MainLayout"


const routes = [
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout
  },
  {
    path: '/weight',
    name: 'weight',
    component: () => import('./views/WeightLayout.vue')
  },
  {
    path: '/paypage',
    name: 'paypage',
    component: () => import('./views/PayPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
