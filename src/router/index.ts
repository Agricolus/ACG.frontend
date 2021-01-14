import FullLayout from '@/layout/fullLayout.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import placeholderComponent from "@/components/placeHolderComponent.vue"

import ProducerSelect from "@/components/import/producers.vue";

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
        component: () => import("@/components/machines/main.vue"),
      },
      {
        path: '/machines/:machineId',
        name: 'machines:movements',
        component: () => import("@/components/machines/movements.vue"),
        props: true,
      },
      {
        path: '/customers',
        name: 'customers',
        component: placeholderComponent
      },
      {
        path: '/import',
        name: 'import',
        component: ProducerSelect
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
