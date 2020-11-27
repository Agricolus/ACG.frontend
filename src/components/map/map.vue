

<template>
  <div class="map" id="map"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted, Ref } from "vue";
import { createMap } from "./map";

export const fukingstate: {
  center: Ref<number[]> | null;
  layers: Ref<L.Layer[]> | null;
} = {
  center: null,
  layers: null,
};

export default defineComponent({
  setup() {
    onMounted(() => {
      createMap("map");
    });
    // onBeforeUnmount(() => {
    //   console.debug("maimaphasbeendetatched!!");
    // });
  },
});
</script>