import { userStore } from '@/components/user/store';
import { IMachine } from '@/modules/machines/store';
import { Options, Vue } from "vue-class-component";
import { producerService } from '../service';


@Options({
})
export default class JohnDeerDocumentSelection extends Vue {
    get user() {
        return userStore.getters.getUser!;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    documents: any[] | null = null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async registerDocument(document: any) {
        await producerService.importDocument(userStore.getters.getUser!.id, document.id, document);
    }

    async mounted() {
        this.documents = await producerService.getDocuments(userStore.getters.getUser!.id);
    }

    setup() {
        console.log("")
    }
}