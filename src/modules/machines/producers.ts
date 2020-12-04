import { Options, Vue } from "vue-class-component";

@Options({
})
export default class MachineProducerSelect extends Vue {

    producer: string | null = null;

    shwoAutheticator = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    producers: any = null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    producerAuthenticator: any = null;


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get producerData(): any { 
        return this.producer && this.producers ? this.producers[this.producer] : null
    }
    async selectProducer() {
        const producerAuthenticator = (await import(`@/modules/${this.producer}`)).AuthenticatorComponent;
        this.producerAuthenticator = producerAuthenticator;
        this.shwoAutheticator = true;
    }

    async mounted() {
        this.producers = await (await fetch("/machine.producers.json")).json();
    }


}

