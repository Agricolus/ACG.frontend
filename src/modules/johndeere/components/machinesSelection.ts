import { userStore } from '@/components/user/store';
import { Options, Vue } from "vue-class-component";
import { producerService } from '../service';

@Options({
})
export default class JohnDeereMachineSelection extends Vue {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    machines: any[] | null = null;

    async mounted() {
        this.machines = await producerService.getMachines(userStore.getters.getUser!.id);
    }
}

