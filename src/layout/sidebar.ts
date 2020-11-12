
import { Options, Vue } from "vue-class-component";

@Options({ name: "sidebar" })
export default class SideBar extends Vue {
  get now() {
    return Date.now();
  }
}
