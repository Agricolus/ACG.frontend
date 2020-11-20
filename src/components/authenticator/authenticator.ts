import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        modelValue: false,
        producerData: null
    },
    emits: ['update:modelValue']
})
export default class Authenticator extends Vue {


    modelValue!: boolean;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    producerData!: any | null;

    get open(): boolean {
        return this.modelValue
    }

    set open(v) {
        this.$emit("update:modelValue", v)
    }

    beforeMount() {
        window.addEventListener("message", this.messageListener, false);
    }

    beforeUnmount() {
        window.removeEventListener("message", this.messageListener);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messageListener(e: MessageEvent): void {
        if (e.origin != window.location.origin) return;
        if (["handler-loaded", "handler-authenticated"].indexOf(e.data?.type) < 0) return;
        if (e.data.type == "handler-loaded") {
            const payload = JSON.parse(JSON.stringify(this.producerData));
            const messagebody = {
                type: "user-authentication",
                payload
            };
            (this.$refs.handler as HTMLIFrameElement).contentWindow!.postMessage(messagebody, window.location.origin);
        }
        if (e.data.type == "handler-authenticated") {
            console.debug("user has been authenticated", e.data.tokenifo);
            this.open = false;
            // const payload = JSON.parse(JSON.stringify(this.producerData));
            // const messagebody = {
            //     type: "organizations-authorization",
            //     payload
            // };
            // (this.$refs.handler as HTMLIFrameElement).contentWindow!.postMessage(messagebody, window.location.origin);
        }
    }

}