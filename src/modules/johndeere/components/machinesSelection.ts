import reactiveMapState from '@/components/map/mapState';
import { userStore } from '@/store/userStore';
import { IMachine } from '@/store/machineStore';
import L from 'leaflet';
import { Options, Vue } from "vue-class-component";
import { producerService } from '../service';
import Loader from "@/components/loader/loader.vue";

@Options({
  components: {
    Loader
  }
})
export default class JohnDeereMachineSelection extends Vue {


  show = true;
  isLoading = false;
  get user() {
    return userStore.getters.getUser!;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  machines: IMachine[] | null = null;

  machineLayer: L.FeatureGroup = L.featureGroup();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async registerMachine(machine: IMachine) {
    if (machine.isRegistered) return;
    await producerService.registerMachine(this.user.id, machine);
  }

  async locationHistory(machine: IMachine) {
    this.machineLayer.clearLayers();
    const locations = await producerService.machineLocationHistory(this.user.id, machine.id!);
    locations?.forEach(ml => {
      if (!ml.point) return;
      const marker = L.marker([ml.point.lat, ml.point.lon]);
      this.machineLayer.addLayer(marker);
    });
    reactiveMapState.bounds = this.machineLayer.getBounds();
  }

  async mounted() {
    this.isLoading = true;
    this.machines = await producerService.getMachines(this.user.id);
    this.isLoading = false;
    reactiveMapState.layers.push(this.machineLayer);
  }

  beforeUnmount() {
    // mapState.layers.splice(mapState.layers.indexOf(this.machineLayer), 1);
    reactiveMapState.layers = reactiveMapState.layers.filter(l => l !== this.machineLayer);
  }
}