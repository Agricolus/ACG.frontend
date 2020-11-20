import FullLayout from '@/layout/fullLayout.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Foo from "@/components/foo.vue"
import Bar from "@/components/bar.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'root',
    component: FullLayout,
    children: [
      {
        path: '/customers',
        name: 'customers',
        component: Foo
      },
      {
        path: '/settings',
        name: 'settings',
        component: Bar
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
