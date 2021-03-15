import { userStore } from '@/store/userStore';
import { Options, Vue } from "vue-class-component";
import { producerService } from '../service';

import Loader from "@/components/loader/loader.vue";

@Options({
    components: {
        Loader
    }
})
export default class JohnDeerDocumentSelection extends Vue {

    isLoading = false;

    get user() {
        return userStore.getters.getUser!;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    documents: any[] | null = null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async registerDocument(document: any) {
        const doc = await producerService.importDocument(userStore.getters.getUser!.id, document.id, document);
        Object.assign(document, doc)
    }

    async mounted() {
        this.isLoading = true;
        this.documents = await producerService.getDocuments(userStore.getters.getUser!.id);
        this.isLoading = false;
    }

    async testit(loader: any) {
        console.debug("testit", loader)
        loader.loading = true;
        const p = new Promise((ok, ko) => {
            setTimeout(() => {
                ok(true);
            }, 10000);
        })
        await p;
        console.debug("loading done")
        loader.loading = false;
    }

}