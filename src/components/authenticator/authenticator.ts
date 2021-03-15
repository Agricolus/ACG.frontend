import { Options, Vue } from "vue-class-component";


export interface IAuthenticator {
    messageListener(e: MessageEvent): void;
}


const dispatcher = function (target: any, messagetype: string): Function | null {
    if (Object.prototype.hasOwnProperty.call(target, messagetype) && typeof target[messagetype] == 'function')
        return target[messagetype] as Function;
    return null;
}


@Options({
    props: {
        modelValue: false
    },
    emits: ['update:modelValue', 'authenticated']
})
export default class BaseAuthenticator extends Vue {
    modelValue!: boolean;

    fullscreen = false;

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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    messageListener(e: MessageEvent): void {
        const messagetype: string = e.data.type;
        if (this.messagesIn.indexOf(messagetype) < 0) { console.debug(`message '${messagetype}' not valid`); return; }
        const handler = dispatcher(this, messagetype);
        if (handler) return handler(e.data);
        throw `no handler for message '${messagetype}'`;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendMessage(type: string, payload: any) {
        if (this.messagesOut.indexOf(type) < 0) throw `message '${type}' not valid`;
        const message = {
            type,
            payload
        };
        (this.$refs.handler as HTMLIFrameElement).contentWindow!.postMessage(message, window.location.origin);
    }

    protected messagesOut: string[] = [];
    protected messagesIn: string[] = [];
}
