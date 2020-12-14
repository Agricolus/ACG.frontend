import mapState from '@/components/map/mapState';
import { userStore } from '@/components/user/store';
import { IMachine } from '@/modules/machines/store';
import L from 'leaflet';
import { Options, Vue } from "vue-class-component";
import { producerService } from '../service';


@Options({
})
export default class JohnDeereMachineSelection extends Vue {
  get user() {
    return userStore.getters.getUser!;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  machines: IMachine[] | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  centerOnMap(machine: IMachine) {
    if (!machine.lat || !machine.lng) return;
    //ADD PIN
    mapState.center = new L.LatLng(machine.lat, machine.lng);
    mapState.zoom = 20;
  }

  async registerMachine(machine: IMachine) {
    if (machine.isRegistered) return;
    await producerService.registerMachine(userStore.getters.getUser!.id, machine);
  }

  async mounted() {
    this.machines = await producerService.getMachines(userStore.getters.getUser!.id);
  }
}