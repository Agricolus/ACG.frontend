import FullLayout from '@/layout/fullLayout.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import placeholderComponent from "@/components/placeHolderComponent.vue"


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'root',
    component: FullLayout,
    redirect: 'machines',
    children: [
      {
        path: '/machines',
        name: 'machines',
        component: placeholderComponent
      },
      {
        path: '/customers',
        name: 'customers',
        component: placeholderComponent
      },
      {
        path: '/settings',
        name: 'settings',
        component: placeholderComponent
      },

    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: 'machines',
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
