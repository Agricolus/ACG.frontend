import { Options, Vue } from "vue-class-component";
import { userServices } from '../../services/userServices';
import { userStore } from "../../store/userStore";

@Options({})
export default class UserInfo extends Vue {

    get user(): unknown {
        return userStore.getters.getUser;
    }

    mounted() {
        userServices.getUserInfo();
    }
}
