import Foo from '@/components/foo.vue'
import Home from '@/components/home.vue'
import FullLayout from '@/layout/fullLayout.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: FullLayout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: '/foo',
        name: 'foo',
        component: Foo
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
