

<template>
  <div class="map" id="map"></div>
</template>
<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from "vue";
// import L from "leaflet";
// import mapState from "./mapState";
import { createMap } from "./map";

export default defineComponent({
  setup() {
    onMounted(() => {
      console.debug("map mounted!!")
      createMap("map");
      // const map = createMap("map");
      // map.setView(mapState.center, mapState.zoom);
      // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      //   maxZoom: 18,
      //   id: "baselayer",
      // }).addTo(map);
    });
    onBeforeUnmount(() => {
      console.debug("maimaphasbeendetatched!!")
    })
  }
});
</script>