import { Options, Vue } from "vue-class-component";
import { userService } from './service';
import { IUserInfo, userStore } from "./store";

@Options({})
export default class UserButton extends Vue {

  get user(): IUserInfo | null {
    return userStore.getters.getUser;
  }

  async mounted() {
    userService.getUserInfo();

  }
}
