import { machinesServices } from "@/services/machineServices";
import { IMachine, machinesStore } from "@/store/machineStore";
import { userStore } from "@/store/userStore";
import L from "leaflet";
import { Options, Vue } from "vue-class-component";
import { FieldRenderer, fieldsLayer } from "../fields";
import reactiveMapState from "../map/mapState";
import MachineCard from "./card.vue";
import "leaflet-textpath/leaflet.textpath.js";

import DatePicker from "vue3-datepicker";

import "vue3-datepicker/dist/vue3-datepicker.css";

import { parseJSON, format, subDays, differenceInMilliseconds, addMilliseconds, differenceInDays } from 'date-fns'

import svgIconStart from "@/assets/img/tractor-start.svg";
import svgIconEnd from "@/assets/img/tractor-end.svg";
const iconStart = L.icon({
    iconUrl: svgIconStart,
    iconSize: [46, 46],
    className: "pin-start-path"
});

const iconEnd = L.icon({
    iconUrl: svgIconEnd,
    iconSize: [46, 46],
    className: "pin-end-path"
});

class Props {
    machineId!: string;
}

type MachinePoint = { operation: string; time: Date; point: [number, number] };
type MovementDescription = { operation: string | null; start: string; end: string; points: { time: string; point: [number, number] }[] };

@Options({
    props: {
        machineId: String
    },
    components: {
        MachineCard,
        DatePicker
    }
})
export default class MacineMovementsSelect extends Vue.with(Props) {

    movements: any[] | null = [];

    layer: L.FeatureGroup = new L.FeatureGroup();

    startDate: Date = subDays(new Date(), 7);

    endDate: Date = new Date();
    days: any = {};
    dayshown = "";
    selectedPaths: string[] = [];

    loading = false;

    get machine(): IMachine {
        return machinesStore.getters.getMachine(this.machineId)!;
    }


    hoursminutes(v: string) {
        const p = v.split(":");
        return p[0] + ":" + p[1];
    }

    prevInterval() {
        const diff = differenceInMilliseconds(this.endDate, this.startDate) * -1;
        this.endDate = addMilliseconds(this.endDate, diff);
        this.startDate = addMilliseconds(this.startDate, diff);
        this.fetchDataFormService();
    }

    nextInterval() {
        const diff = differenceInMilliseconds(this.endDate, this.startDate);
        this.endDate = addMilliseconds(this.endDate, diff);
        this.startDate = addMilliseconds(this.startDate, diff);
        this.fetchDataFormService();
    }

    get canClickNextInterval() {
        return differenceInDays(new Date(), this.endDate) > 0
    }

    draw(movements: MovementDescription[], dayshown: string) {
        this.dayshown = dayshown;
        this.selectedPaths = movements.map(m => dayshown + m.start);
        this.drawSelectedPaths(movements);
    }

    drawSelectedPaths(movements: MovementDescription[]) {
        this.layer.clearLayers();
        if (!movements) return;
        let lastpoint: any = null;
        movements.forEach(m => {
            if (this.selectedPaths.indexOf(this.dayshown + "" + m.start) < 0) {
                lastpoint = null;
                return;
            }

            const lineoptions = { weight: 8, className: "tractor-path" } as L.PolylineOptions;
            const textymboloptions = { offset: 4, repeat: true, attributes: { fill: 'green', className: "tractor-path-arrow" } };

            if (m.operation) {
                lineoptions.weight = 1;
                lineoptions.className = "tractor-path-operation";
                textymboloptions.attributes.fill = "yellow"
            }

            const daypath = L.polyline(m.points.map(d => d.point), lineoptions);
            (daypath as any).setText('   ►   ', textymboloptions);
            daypath.addTo(this.layer);

            if (!m.operation)
                m.points.forEach(d => {
                    const point = d.point;
                    const pm = L.circleMarker([point[0], point[1]], { radius: 10 });
                    pm.bindPopup((p) => {
                        return `time: ${d.time}`;
                    });
                    pm.addTo(this.layer);
                });

            const startpoint = m.points[0];
            const endp = m.points[m.points.length - 1];
            const startmarker = L.marker([startpoint.point[0], startpoint.point[1]], { icon: iconStart });
            const endmarker = L.marker([endp.point[0], endp.point[1]], { icon: iconEnd });
            startmarker.bindPopup((p) => {
                return `time: ${startpoint.time}`;
            });
            endmarker.bindPopup((p) => {
                return `time: ${endp.time}`;
            });
            // marker.bindPopup(m.name);
            startmarker.addTo(this.layer);
            endmarker.addTo(this.layer);

            if (lastpoint != null) {
                lineoptions.weight = 1;
                lineoptions.className = "tractor-path-connection";
                const opts = { offset: 4, repeat: true, attributes: { fill: '#3388ff' } };
                const connectionpath = L.polyline([lastpoint.point, startpoint.point], lineoptions);
                (connectionpath as any).setText('   ►   ', opts);
                connectionpath.addTo(this.layer);
            }
            lastpoint = endp;
        });
        reactiveMapState.bounds = this.layer.getBounds();
    }

    async fetchDataFormService() {
        this.layer.clearLayers();
        this.loading = true;
        const userid = userStore.getters.getUser!.id
        this.movements = await machinesServices.getMachineMovements(userid, this.machineId!, { start: this.startDate, end: this.endDate });
        this.loading = false;
        this.selectedPaths = [];
    }

    beforeMount() {
        reactiveMapState.layers.push(this.layer);
        reactiveMapState.layers.push(fieldsLayer);

        this.fetchDataFormService();

        this.$watch(() => this.movements?.map(m => m), (n: any[], o: any[]) => {
            this.days = {};
            n.forEach((daypoints: MachinePoint[]) => {
                const daysequences: MovementDescription[] = [];
                const currday = parseJSON(daypoints[0].time)
                this.days[format(currday, "yyyy-MM-dd")] = daysequences;
                let previousMachinePoint: MachinePoint = {} as MachinePoint;
                daypoints.forEach((point: MachinePoint, index: number) => {
                    let currsequence = daysequences[daysequences.length - 1];
                    if (previousMachinePoint.operation !== point.operation) {
                        if (currsequence && previousMachinePoint.time)
                            currsequence.end = format(parseJSON(previousMachinePoint.time), "kk:mm:ss.SSS");
                        currsequence = {
                            operation: point.operation,
                            start: format(parseJSON(point.time), "kk:mm:ss.SSS"),
                            end: format(parseJSON(point.time), "kk:mm:ss.SSS"),
                            points: []
                        };
                        daysequences.push(currsequence);
                    }
                    currsequence.end = format(parseJSON(point.time), "kk:mm:ss.SSS");
                    currsequence.points.push({ point: [point.point[0], point.point[1]], time: format(parseJSON(point.time), "kk:mm:ss.SSS") });
                    previousMachinePoint = point;
                })
            });
        });

        this.$watch(() => this.selectedPaths.map(p => p), (n: string[], o: string[]) => {
            this.drawSelectedPaths(this.days[this.dayshown]);
        })
    }


    beforeUnmount() {
        reactiveMapState.layers.splice(reactiveMapState.layers.indexOf(this.layer), 1);
        reactiveMapState.layers.splice(reactiveMapState.layers.indexOf(fieldsLayer), 1);
    }
}
