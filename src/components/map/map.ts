
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import L, { latLng } from 'leaflet';
import 'leaflet-defaulticon-compatibility';

import { watch } from 'vue';

import mapState, { reactiveMapState } from './mapState';
let leafletMainMap: L.Map | null = null;

// watch(() => [latLng(mapState.center), mapState.zoom], () => {
//   leafletMainMap?.setView(mapState.center, mapState.zoom);
// });


export function createMap(selector: string): L.Map {
  debugger
  if (!leafletMainMap) {
    leafletMainMap = L.map(selector);
    leafletMainMap.setView(mapState.center, mapState.zoom);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      id: "baselayer",
    }).addTo(leafletMainMap);
  }
  return leafletMainMap;
}

// export function addLayer(layer: L.Layer, bounds: L.LatLngBounds | null = null) {
//   debugger
//   if (leafletMainMap) {
//     layer.addTo(leafletMainMap);
//     if (bounds && bounds.isValid()) leafletMainMap.fitBounds(bounds);
//   }
// }

// export function removeLayer(layer: L.Layer) {
//   layer.remove();
// }

// export function zoomTo(zoom = 20) {
//   if (leafletMainMap) {
//     leafletMainMap.setZoom(zoom);
//   }
// }

