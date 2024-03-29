import reactiveMapState from '@/components/map/mapState';
import { userStore } from '@/store/userStore';
import L from 'leaflet';
import { Options, Vue } from "vue-class-component";
import { producerService } from '../service';
import { IField } from '@/store/fieldStore';
import { IClient } from '@/store/clientStore';
import Loader from "@/components/loader/loader.vue";

@Options({
  components: {
    Loader
  }
})
export default class JohnDeereFieldsSelection extends Vue {
    show = true;
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
        const registeredField = await producerService.registerField(this.user.id, field);
        const f = this.fields?.find(f => f.id == registeredField.id);
        if (f) f.isRegistered = true;
    }

    async registerFields() {
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
                poly.bindPopup(() => {
                    return `name: ${f.name}<br/>client: ${client.name}<br/>passable`;
                })
                poly.addTo(this.fieldsLayer);
                polys?.push(poly)
            });
            f.unpassableBoundaries.forEach(polycoords => {
                const poly = new L.Polygon(polycoords.map(c => [c[0], c[1]]), { className: "not-passable" });
                poly.bindPopup(() => {
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