import reactiveMapState from '@/components/map/mapState';
import { userStore } from '@/store/userStore';
import { IMachine } from '@/store/machineStore';
import L from 'leaflet';
import { resolveTransitionHooks } from 'vue';
import { Options, Vue } from "vue-class-component";
import { stringifyQuery } from 'vue-router';
import { producerService } from '../service';
import component from '*.vue';
import { IField } from '@/store/fieldStore';
import { IClient } from '@/store/clientStore';


@Options({
})
export default class JohnDeereFieldsSelection extends Vue {

    isLoading = false;
    get user() {
        return userStore.getters.getUser!;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fields: IField[] | null = null;
    clients: IClient[] | null = null;
    fieldsPolygonsMap: Map<string, L.Polygon[]> = new Map<string, L.Polygon[]>();
    fieldsLayer: L.FeatureGroup = L.featureGroup();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async registerField(field: any) {
        if (field.isRegistered) return;
        await producerService.registerField(this.user.id, field);
    }

    async registerFields(field: any) {
        if (!this.fields) return;
        await producerService.registerFields(this.user.id, this.fields);
    }


    highlight(field: any, show: boolean) {
        const polys = this.fieldsPolygonsMap.get(field.id);
        if (!polys) return;
        const p = (polys[0] as any)._path as SVGPathElement;
        if (show)
            p.classList.add("highlight");
        else
            p.classList.remove("highlight");
    }

    fieldClient(field: IField): IClient {
        return this.clients?.find(c => c.id == field.clientId)!;
    }


    async mounted() {
        this.isLoading = true;
        this.fieldsPolygonsMap = new Map<string, L.Polygon[]>();
        const fieldsAndClLients = await producerService.getFields(this.user.id);
        this.isLoading = false;
        this.fields = fieldsAndClLients.fields;
        this.clients = fieldsAndClLients.clients;
        this.fields.forEach(f => {
            let polys: L.Polygon[] | null = this.fieldsPolygonsMap.get(f.id!) || null;
            if (!polys) polys = [];
            this.fieldsPolygonsMap.set(f.id!, polys);
            const client = this.fieldClient(f);
            f.boundaries.forEach(polycoords => {
                const poly = new L.Polygon(polycoords.map(c => [c[0], c[1]]), { className: "passable" });
                poly.bindPopup((p) => {
                    return `name: ${f.name}<br/>client: ${client.name}<br/>passable`;
                })
                poly.addTo(this.fieldsLayer);
                polys?.push(poly)
            });
            f.unpassableBoundaries.forEach(polycoords => {
                const poly = new L.Polygon(polycoords.map(c => [c[0], c[1]]), { className: "not-passable" });
                poly.bindPopup((p) => {
                    return `name: ${f.name}<br/>client: ${client.name}<br/>not passable`;
                })
                poly.addTo(this.fieldsLayer);
                polys?.push(poly)
            });

        })

        reactiveMapState.layers.push(this.fieldsLayer);
    }

    beforeUnmount() {
        reactiveMapState.layers = reactiveMapState.layers.filter(l => l !== this.fieldsLayer);
    }
}