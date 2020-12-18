import L from 'leaflet';
import { watch } from 'vue';
import { Options, Vue } from "vue-class-component";
import { IMachine, machinesStore } from "../../store/machineStore";
import reactiveMapState from '../map/mapState';
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
    reactiveMapState.center = new L.LatLng(machine.lat, machine.lng);
    reactiveMapState.zoom = 18;
  }

  startImport() {
    this.$router.push({ name: "machines:producers" })
  }

  mounted() {
    reactiveMapState.layers.push(machineModule.layer);
    watch(() => machinesStore.state.machines?.map(m => m), () => {
      reactiveMapState.bounds = machineModule.layer.getBounds();
    }, { immediate: true });
  }

  beforeUnmount() {
    reactiveMapState.layers.splice(reactiveMapState.layers.indexOf(machineModule.layer), 1);
  }
}

