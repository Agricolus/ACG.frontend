import L from 'leaflet';
import { watch } from 'vue';
import { Options, Vue } from "vue-class-component";
import { machinesService } from './service';
import { IMachine, machinesStore } from "./store";

import mapState from '../map/mapState';
import { addLayer, removeLayer } from '../map/map';

machinesService.getMachines();

const machineLayer = L.geoJSON(undefined, {
    pointToLayer: (feature, latlng) => {
        return L.marker([latlng.lng, latlng.lat]);
    }
});

watch(() => machinesStore.state.machines?.map(m => m), (n, o) => {
    const added = n.filter(x => !o.includes(x));
    machineLayer.clearLayers();
    if (added.length) {
        added.forEach(m => machineLayer.addData(m));
    }
});


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

    showOnMap(machine: IMachine) {
        mapState.center = machine.geometry.coordinates as [number, number];
        mapState.zoom = 15;
    }

    mounted() {
        addLayer(machineLayer);
    }
    beforeUnmount() {
        removeLayer(machineLayer);
    }
}

