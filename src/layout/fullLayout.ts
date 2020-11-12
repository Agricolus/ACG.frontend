
import { Options, Vue } from "vue-class-component"
import Sidebar from "./sidebar.vue"

@Options({
  components: {
    Sidebar
  }
})
export default class FullLayout extends Vue { }
