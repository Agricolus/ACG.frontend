import { Options, Vue } from "vue-class-component";
import { userServices } from '@/services/userServices';
import { IUserInfo, userStore } from "../../store/userStore";

@Options({})
export default class UserButton extends Vue {

  get user(): IUserInfo | null {
    return userStore.getters.getUser;
  }

  async mounted() {
    userServices.getUserInfo();

  }
}
