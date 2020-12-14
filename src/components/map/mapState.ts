import { reactive, ref } from 'vue';

const mapState = reactive<{
  zoom: number;
  center: L.LatLngExpression;
  bounds: L.LatLngBounds | null;
  layers: L.Layer[];
}>({
  zoom: 15,
  center: [0, 0],
  bounds: null,
  layers: []
});


export const reactiveMapState = {
  zoom: ref<number>(3),
  center: ref<L.LatLngExpression>([0, 0]),
  bounds: reactive<L.LatLngBoundsExpression>([]),
  layers: ref<L.Layer[]>([])
}


export default mapState