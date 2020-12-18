import { Options, Vue } from "vue-class-component";

import machines from "./machinesSelection.vue";
import documents from "./documentsSelection.vue";
// import clients from "./clientsSelection.vue";
import fields from "./fieldsSelection.vue";

@Options({
    components: {
        machines,
        documents,
        fields
    }
})
export default class JohnDeereMain extends Vue {
}