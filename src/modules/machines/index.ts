
import L from 'leaflet';
import { watch } from 'vue';
import registerRoutes from "./route"

import { machinesService } from "./service"
import { machinesStore } from './store';
import { userStore } from '@/components/user/store';

registerRoutes();

const unregisterUserWatcher = watch(() => userStore.getters.getUser, (n, o) => {
    if (!n) return;
    machinesService.getMachines(n.id);
    unregisterUserWatcher();
});

const machineLayer = L.featureGroup();

watch(() => machinesStore.state.machines?.map(m => m), (n, o) => {
    machineLayer.clearLayers();
    if (n.length) {
        n.forEach(m => {
            if (!m.lat || !m.lng) return;
            machineLayer.addLayer(L.marker([m.lat, m.lng]))
        });
    }
});


export default {
    store: machinesStore,
    service: machinesService,
    layer: machineLayer
}