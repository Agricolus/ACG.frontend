import * as store from "./store"
import { userService } from "./service"
import UserButton from "./userButton.vue";

userService.getUserInfo();

export default {
    store,
    service: userService,
    components: {
        userButton: UserButton
    }
}