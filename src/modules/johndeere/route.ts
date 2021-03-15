import router from "@/router"
import { RouteRecordRaw } from 'vue-router'


const routes: RouteRecordRaw[] = [
    {
        path: 'johndeere',
        name: 'johndeere:import',
        component: () => import("./components/main.vue")
    },
    {
        path: 'johndeere/machines',
        name: 'johndeere:machines:import',
        component: () => import("./components/machinesSelection.vue")
    },
    {
        path: 'johndeere/documents',
        name: 'johndeere:documents:import',
        component: () => import("./components/documentsSelection.vue")
    }];

export default function registerRoutes() {
    routes.forEach(r => {
        router.addRoute("import", r)
    })
    router.replace(router.currentRoute.value.fullPath)
}

