
import { defineAsyncComponent } from 'vue';
import { Options, Vue } from "vue-class-component"
import Sidebar from "./sidebar.vue"

import UserButton from "@/components/user/userButton.vue"

import Map from "@/components/map/map.vue"

@Options({
  components: {
    Sidebar,
    UserButton,
    mainmap: Map
  }
})
export default class FullLayout extends Vue { 

}
