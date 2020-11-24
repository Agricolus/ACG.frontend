import router from "@/router"
import { RouteRecordRaw } from 'vue-router'
import MachineSelection from "./components/machinesSelection.vue"



const routes: RouteRecordRaw[] = [
    {
        path: 'johndeere/machines',
        name: 'johndeere:machines:import',
        components: {
            // default: () => import("../machines/producers.vue"),
            rightPane: MachineSelection
        }
    }];

export default function registerRoutes() {
    routes.forEach(r => {
        router.addRoute("root", r)
    })
    router.replace(router.currentRoute.value.fullPath)
}

