

<template>
	<div class="map" id="map"></div>
</template>
<script lang="ts">

import L, { latLng } from "leaflet";
import { defineComponent, onMounted, Ref, watch } from "vue";
import { createMap } from "./map";
import mapState from "./mapState";

export default defineComponent({
	setup() {
		const mapReady = new Promise<L.Map>((resolve) => {
			onMounted(() => {
				(() => {
					const leafletMainMap = L.map("map");
					L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
						maxZoom: 18,
						id: "baselayer",
					}).addTo(leafletMainMap);
					leafletMainMap.setView(mapState.center, mapState.zoom);
					resolve(leafletMainMap);
				})();

			});
		});

		watch(() => [latLng(mapState.center), mapState.zoom], async (n, o) => {
			console.debug('watch', n, o)
			const map = await mapReady;
			map.setView(mapState.center, mapState.zoom);
		}, { flush: 'sync' });

		watch(() => mapState.layers.map(l => l), async (n, o) => {
			const map = await mapReady;
			const newLayers = n.filter(x => !o.includes(x));
			const layerToRemove = o.filter(x => !n.includes(x));
			newLayers.forEach(l => l.addTo(map))
			layerToRemove.forEach(l => l.remove())
		}, { flush: 'sync' });

		watch(() => mapState.bounds, async (n, o) => {
			const map = await mapReady;
			if (n && n.isValid()) map.fitBounds(n);
		}, { flush: 'sync' });
	},
});


</script>
