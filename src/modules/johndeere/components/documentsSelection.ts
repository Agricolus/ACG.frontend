import { userStore } from '@/store/userStore';
import { IMachine } from '@/store/machineStore';
import { Options, Vue } from "vue-class-component";
import { producerService } from '../service';


@Options({
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
        await producerService.importDocument(userStore.getters.getUser!.id, document.id, document);
    }

    async mounted() {
        this.isLoading = true;
        this.documents = await producerService.getDocuments(userStore.getters.getUser!.id);
        this.isLoading = false;
    }

}