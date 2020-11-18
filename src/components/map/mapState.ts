import { reactive } from 'vue';

const mapState =  reactive<{
    zoom: number;
    center: L.LatLngExpression;
}>({
    zoom: 3,
    center: [0, 0],
});


export default mapState