import { userStore } from '@/components/user/store';
import { IMachine } from '@/modules/machines/store';
import { Options, Vue } from "vue-class-component";
import { producerService } from '../service';


@Options({
})
export default class JohnDeereMachineSelection extends Vue {

  isLoading = false;
  get user() {
    return userStore.getters.getUser!;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  machines: IMachine[] | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any


  async registerMachine(machine: IMachine) {
    if (machine.isRegistered) return;
    await producerService.registerMachine(userStore.getters.getUser!.id, machine);
  }

  async mounted() {
    this.isLoading = true;
    this.machines = await producerService.getMachines(userStore.getters.getUser!.id);
    this.isLoading = false;

  }
}