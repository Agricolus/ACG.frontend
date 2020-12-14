
import L from 'leaflet';
import { watch } from 'vue';
import registerRoutes from "./route"

import { machinesService } from "./service"
import { machinesStore } from './store';
import { userStore } from '@/components/user/store';
import svgIcon from "@/assets/img/tractor-icon-map.svg";

const moduleStartupWatcher = watch(() => userStore.getters.getUser, async (n, o) => {
  if (!n) return;
  await machinesService.getMachines(n.id);
  registerRoutes();
  moduleStartupWatcher();
});

const machineLayer = L.featureGroup();

const icon = L.icon({
  iconUrl: svgIcon,
  iconSize: [46, 46]
});

watch(() => machinesStore.state.machines?.map(m => m), (n, o) => {
  machineLayer.clearLayers();
  if (n.length) {
    n.forEach(m => {
      if (!m.lat || !m.lng) return;
      const marker = L.marker([m.lat, m.lng], { icon: icon });
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