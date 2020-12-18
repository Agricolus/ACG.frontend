
import L from 'leaflet';
import { watch } from 'vue';

import { machinesServices } from "../../services/machineServices"
import { machinesStore } from '../../store/machineStore';
import { userStore } from '@/store/userStore';
import svgIcon from "@/assets/img/tractor-icon-map.svg";


machinesServices.getMachines(userStore.getters.getUser!.id);

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
  layer: machineLayer
}