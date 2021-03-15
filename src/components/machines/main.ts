import L from 'leaflet';
import { watch } from 'vue';
import { Options, Vue } from "vue-class-component";
import { IMachine, machinesStore } from "../../store/machineStore";
import reactiveMapState from '../map/mapState';
import { machinesLayer } from "./index";

import MachineCard from "./card.vue";

@Options({
  components: {
    MachineCard
  }
})
export default class MachineIndex extends Vue {

  get machines(): IMachine[] {
    return machinesStore.state.machines!;
  }

  mounted() {
    reactiveMapState.layers.push(machinesLayer);
    watch(() => machinesStore.state.machines?.map(m => m), () => {
      reactiveMapState.bounds = machinesLayer.getBounds();
    }, { immediate: true });
  }

  beforeUnmount() {
    reactiveMapState.layers.splice(reactiveMapState.layers.indexOf(machinesLayer), 1);
  }
}

