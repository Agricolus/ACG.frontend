
import L from 'leaflet';
import { watch } from 'vue';

import { fieldsServices } from "../../services/fieldServices"
import { fieldsStore } from '../../store/fieldStore';
import { userStore } from '@/store/userStore';
import svgIcon from "@/assets/img/tractor-icon-map.svg";


fieldsServices.getFields(userStore.getters.getUser!.id);

const fieldsLayer = L.featureGroup();

const icon = L.icon({
  iconUrl: svgIcon,
  iconSize: [46, 46]
});

watch(() => fieldsStore.state.fields?.map(m => m), (n, o) => {
  fieldsLayer.clearLayers();
  if (n.length) {
    n.forEach(m => {
      if (!m.lat || !m.lng) return;
      const marker = L.marker([m.lat, m.lng], { icon: icon });
      marker.bindPopup(m.name);
      fieldsLayer.addLayer(marker);
    });
  }
});

export default {
  layer: fieldsLayer
}