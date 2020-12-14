import L from 'leaflet';
import { Options, Vue } from "vue-class-component";
import { IMachine, machinesStore } from "./store";
import mapState from '../../components/map/mapState';
import machineModule from "./index";

@Options({})
export default class MachineIndex extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  machineLayer: L.GeoJSON<any> | undefined = undefined;

  get machine(): IMachine | null {
    return machinesStore.getters.getMachine("first");
  }


  get machines(): IMachine[] {
    return machinesStore.state.machines!;
  }

  centerOnMap(machine: IMachine) {
    if (!machine.lat || !machine.lng) return;
    mapState.center = new L.LatLng(machine.lat, machine.lng);
    mapState.zoom = 18;
  }

  startImport() {
    this.$router.push({ name: "machines:producers" })
  }

  mounted() {
    mapState.layers.push(machineModule.layer);
    mapState.bounds = machineModule.layer.getBounds();
  }

  beforeUnmount() {
    mapState.layers.splice(mapState.layers.indexOf(machineModule.layer), 1);
  }
}

