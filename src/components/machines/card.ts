import L from 'leaflet';
import { watch } from 'vue';
import { Options, Vue } from "vue-class-component";
import { IMachine, machinesStore } from "../../store/machineStore";
import reactiveMapState from '../map/mapState';
import { machinesLayer } from "./index";


class Props {
    machine!: IMachine;    
}

@Options({
    props: {
        machine: null
    }
})
export default class MachineCard extends Vue.with(Props) {

    centerOnMap() {
        if (!this.machine.lat || !this.machine.lng) return;
        reactiveMapState.center = new L.LatLng(this.machine.lat, this.machine.lng);
        reactiveMapState.zoom = 18;
    }

    startImport() {
        this.$router.push({ name: "machines:producers" })
    }
    movements() {
        this.$router.push({ name: "machines:movements", params: { machineId: this.machine.id! } })
    }
}

