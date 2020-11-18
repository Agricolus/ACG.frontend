import FullLayout from '@/layout/fullLayout.vue'
import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Machines from "@/components/machines/index.vue"
import Foo from "@/components/foo.vue"
import Bar from "@/components/bar.vue"

// const Machines = defineAsyncComponent(
//   () => import("@/components/machines/index.vue")
// );

// const Foo = defineAsyncComponent(
//   () => import("@/components/foo.vue")
// );


// const Bar = defineAsyncComponent(
//   () => import("@/components/foo.vue")
// );

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: FullLayout,
    children: [
      {
        path: '/machines',
        name: 'machines',
        component: Machines
      },
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
