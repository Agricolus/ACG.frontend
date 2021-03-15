import { reactive, ref } from 'vue';

const reactiveMapState = reactive<{
  zoom: number;
  center: L.LatLngExpression;
  bounds: L.LatLngBounds | null;
  layers: L.Layer[];
}>({
  zoom: 15,
  center: [0, 0],
  bounds: null,
  layers: new Array<L.Layer>()
});

export default reactiveMapState