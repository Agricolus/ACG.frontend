import { Options, Vue } from "vue-class-component";
import { userService } from './service';
import { userStore } from "./store";

@Options({})
export default class UserButton extends Vue {

    get user(): unknown {
        return userStore.getters.getUser;
    }

    mounted() {
        userService.getUserInfo();
    }
}
