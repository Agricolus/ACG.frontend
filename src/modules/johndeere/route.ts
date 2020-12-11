import router from "@/router"
import { RouteRecordRaw } from 'vue-router'


const routes: RouteRecordRaw[] = [
    {
        path: 'johndeere/machines',
        name: 'johndeere:machines:import',
        components: {
            default: () => import("@/modules/machines/producers.vue"),
            rightPane: () => import("./components/machinesSelection.vue")
        }
    },
    {
        path: 'johndeere/documents',
        name: 'johndeere:documents:import',
        components: {
            default: () => import("@/modules/machines/producers.vue"),
            rightPane: () => import("./components/documentsSelection.vue")
        }
    }];

export default function registerRoutes() {
    routes.forEach(r => {
        router.addRoute("root", r)
    })
    router.replace(router.currentRoute.value.fullPath)
}

