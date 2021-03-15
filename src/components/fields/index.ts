import L from 'leaflet';
import { watch } from 'vue';

import { fieldsServices } from "../../services/fieldServices"
import { fieldsStore, IField } from '../../store/fieldStore';
import { userStore } from '@/store/userStore';
import svgIcon from "@/assets/img/tractor-icon-map.svg";


export class FieldRenderer {
  field: IField;

  constructor(field: IField) {
    this.field = field;
  }

  get boundaries(): L.Polygon[] {
    return this.field.boundaries.map(polycoords => {
      const poly = new L.Polygon(polycoords.map(c => [c[0], c[1]]), { className: "passable" });
      poly.bindPopup((p) => {
        return `name: ${this.field.name}<br/>passable`;
      });
      return poly;
    });
  }
  
  get unpassableBoundaries(): L.Polygon[] {
    return this.field.unpassableBoundaries.map(polycoords => {
      const poly = new L.Polygon(polycoords.map(c => [c[0], c[1]]), { className: "not-passable" });
      poly.bindPopup((p) => {
        return `name: ${this.field.name}<br/>not passable`;
      });
      return poly;
    });
  }
}


fieldsServices.getFields(userStore.getters.getUser!.id);

export const fieldsLayer = L.featureGroup();

const icon = L.icon({
  iconUrl: svgIcon,
  iconSize: [46, 46]
});

watch(() => fieldsStore.state.fields?.map(m => m), (n, o) => {
  fieldsLayer.clearLayers();
  if (n.length) {
    n.forEach(m => {
      const field = new FieldRenderer(m);
      field.boundaries.forEach(b => {
        b.addTo(fieldsLayer);
      });
      field.unpassableBoundaries.forEach(b => {
        b.addTo(fieldsLayer);
      })
    });
  }
});
