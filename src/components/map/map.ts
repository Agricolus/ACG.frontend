
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import L, { latLng } from 'leaflet';
import 'leaflet-defaulticon-compatibility';

import { watch } from 'vue';

import mapState from './mapState';
let leafletMainMap: L.Map | null = null;

watch(() => [latLng(mapState.center), mapState.zoom], () => {
    leafletMainMap?.setView(mapState.center, mapState.zoom);
});

export function createMap(selector: string): L.Map {
    if (!leafletMainMap)
        leafletMainMap = L.map(selector);
    return leafletMainMap;
}

export function addLayer(layer: L.Layer) {
    if (leafletMainMap)
        layer.addTo(leafletMainMap);
}

export function removeLayer(layer: L.Layer) {
    layer.remove();
}

