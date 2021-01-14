import { machinesServices } from "@/services/machineServices";
import { IMachine, machinesStore } from "@/store/machineStore";
import { userStore } from "@/store/userStore";
import L from "leaflet";
import { Options, Vue } from "vue-class-component";
import { FieldRenderer } from "../fields";
import reactiveMapState from "../map/mapState";
import MachineCard from "./card.vue";
import "leaflet-textpath/leaflet.textpath.js";

class Props {
    machineId!: string;
}

@Options({
    props: {
        machineId: String
    },
    components: {
        MachineCard
    }
})
export default class MacineMovementsSelect extends Vue.with(Props) {

    routesPolylineMap: Map<Date, L.Polyline> = new Map<Date, L.Polyline>();

    movements: any[] | null = [];

    layer: L.FeatureGroup = new L.FeatureGroup();

    get machine(): IMachine {
        return machinesStore.getters.getMachine(this.machineId)!;
    }

    get inFieldMovements() {
        return (this.movements || []).filter(m => m.field);
    }

    get outFieldMovementsPoints() {
        return (this.movements || []).find((f) => !f.field)?.points
    }

    dateOf(points: any) {
        return points[0].time;
    }

    highlights(points: any[], show: boolean) {
        const geom = this.routesPolylineMap.get(points[0].time);
        if (!geom) return;
        const p = (geom as any)._path as SVGPathElement;
        if (show)
            p.classList.add("highlight");
        else
            p.classList.remove("highlight");
    }

    // async beforeMount() {
    //     this.movements = await machinesServices.getMachineMovements(userStore.getters.getUser!.id, this.machineId!);
    //     this.movements?.forEach(f => {
    //         f.points.forEach((daypoints: { time: Date; point: [number, number] }[]) => {
    //             const daypath = L.polyline(daypoints.map(d => d.point), { weight: 8, className: "tractor-path" });
    //             this.routesPolylineMap.set(daypoints[0].time, daypath);
    //             (daypath as any).setText('   ►   ', { offset: 4, repeat: true, attributes: { fill: 'green', className: "tractor-path-arrow" } });
    //             daypath.addTo(this.layer);
    //         });
    //         if (!f.field) return;
    //         const field = new FieldRenderer(f.field);
    //         field.boundaries.forEach(b => {
    //             b.addTo(this.layer);
    //         });
    //         field.unpassableBoundaries.forEach(b => {
    //             b.addTo(this.layer);
    //         });

    //     });
    //     reactiveMapState.layers.push(this.layer);
    //     reactiveMapState.bounds = this.layer.getBounds();
    // }

    async beforeMount() {
        this.movements = await machinesServices.getMachineMovements(userStore.getters.getUser!.id, this.machineId!);
        this.movements?.forEach(f => {
            f.points.forEach((daypoints: { time: Date; point: [number, number] }[]) => {
                const daypath = L.polyline(daypoints.map(d => d.point), { weight: 8, className: "tractor-path" });
                this.routesPolylineMap.set(daypoints[0].time, daypath);
                (daypath as any).setText('   ►   ', { offset: 4, repeat: true, attributes: { fill: 'green', className: "tractor-path-arrow" } });
                daypath.addTo(this.layer);
            });
            if (!f.field) return;
            const field = new FieldRenderer(f.field);
            field.boundaries.forEach(b => {
                b.addTo(this.layer);
            });
            field.unpassableBoundaries.forEach(b => {
                b.addTo(this.layer);
            });

        });
        reactiveMapState.layers.push(this.layer);
        reactiveMapState.bounds = this.layer.getBounds();
    }


    beforeUnmount() {
        reactiveMapState.layers.splice(reactiveMapState.layers.indexOf(this.layer), 1)
    }
}
