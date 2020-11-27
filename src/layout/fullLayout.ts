
import { defineAsyncComponent } from 'vue';
import { Options, Vue } from "vue-class-component"
import Sidebar from "./sidebar.vue"
// import UserButton from "@/components/user/userButton.vue"

const UserModule = import("@/components/user");

const UserButton = defineAsyncComponent(async () => (await UserModule).default.components.userButton);

import Map from "@/components/map/map.vue"

console.debug(Map)

@Options({
  components: {
    Sidebar,
    UserButton,
    mainmap: Map
  }
})
export default class FullLayout extends Vue { 

}
