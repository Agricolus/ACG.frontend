
import L from 'leaflet';
import { watch } from 'vue';
import registerRoutes from "./route"

import { machinesService } from "./service"
import { machinesStore } from './store';
import { userStore } from '@/components/user/store';


const moduleStartupWatcher = watch(() => userStore.getters.getUser, async (n, o) => {
  if (!n) return;
  await machinesService.getMachines(n.id);
  registerRoutes();
  moduleStartupWatcher();
});

const machineLayer = L.featureGroup();


watch(() => machinesStore.state.machines?.map(m => m), (n, o) => {
  machineLayer.clearLayers();
  if (n.length) {
    n.forEach(m => {
      if (!m.lat || !m.lng) return;
      const marker = L.marker([m.lat, m.lng]);
      marker.bindPopup(m.name);
      machineLayer.addLayer(marker);
    });
  }
});


export default {
  store: machinesStore,
  service: machinesService,
  layer: machineLayer
}