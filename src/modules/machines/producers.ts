import { Options, Vue } from "vue-class-component";

import authenticator from "@/components/authenticator/authenticator.vue"

@Options({
    components: {
        authenticator
    }
})
export default class MachineProducerSelect extends Vue {

    producer: string | null = null;
    shwoAutheticator = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    producers: any = null;

    async mounted() {
        this.producers = await (await fetch("/machine.producers.json")).json();
    }
}

