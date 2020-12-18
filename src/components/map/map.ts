
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import L, { latLng } from 'leaflet';
import 'leaflet-defaulticon-compatibility';

import { defineComponent, onMounted, watch, WatchSource } from 'vue';

import reactiveMapState from './mapState';

export default defineComponent({
  setup() {
    const mapReady = new Promise<L.Map>((resolve) => {
      onMounted(() => {
        const leafletMainMap = L.map("map", { preferCanvas: false });
        // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        //   maxZoom: 18,
        //   id: "baselayer"
        // }).addTo(leafletMainMap);

        L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
          maxZoom: 18,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        }).addTo(leafletMainMap);
        leafletMainMap.setView(reactiveMapState.center, reactiveMapState.zoom);
        resolve(leafletMainMap);
      });
    });

    watch<[L.LatLngExpression, number]>(() => [reactiveMapState.center, reactiveMapState.zoom], async (n, o) => {
      const map = await mapReady;
      map.setView(n[0], n[1]);
    }, { flush: 'sync' });

    // watch<L.Layer[]>(reactiveMapState.layers.map(l => l), async (n, o) => {
    watch(() => reactiveMapState.layers.map(l => l), async (n, o) => {
      console.debug("layer", n, o)
      const map = await mapReady;
      console.debug("layer2", n, o)
      const newLayers = n.filter(x => !o.includes(x));
      const layerToRemove = o.filter(x => !n.includes(x!));
      newLayers.forEach(l => l.addTo(map))
      layerToRemove.forEach(l => l!.remove())
    }, { flush: 'sync' });

    watch<L.LatLngBounds | null>(() => reactiveMapState.bounds, async (n, o) => {
      console.debug("bound")
      const map = await mapReady;
      console.debug("bound2")
      if (n && n.isValid()) map.fitBounds(n);
    }, { flush: 'sync' });
  },
});