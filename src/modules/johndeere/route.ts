import router from "@/router"
import { RouteRecordRaw } from 'vue-router'


const routes: RouteRecordRaw[] = [
    {
        path: 'johndeere/machines',
        name: 'johndeere:machines:import',
        component: () => import("./components/machinesSelection.vue")
    }];

export default function registerRoutes() {
    routes.forEach(r => {
        router.addRoute("machines:producers", r)
    })
    router.replace(router.currentRoute.value.fullPath)
}

