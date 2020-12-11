import router from "@/router"
import { RouteRecordRaw } from 'vue-router'
import Bar from "@/components/bar.vue"


const routes: RouteRecordRaw[] = [{
    path: '/machines',
    name: 'machines',
    component: () => import("./main.vue"),
},
{
    path: '/machines/producers',
    name: 'machines:producers',
   component:  () => import("./producers.vue"),
}]

export default function registerRoutes() {
    routes.forEach(r => {
        router.addRoute("root", r)
    });
    router.replace(router.currentRoute.value.fullPath)
}

