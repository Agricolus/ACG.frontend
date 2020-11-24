import { toRaw } from 'vue';
import { Options, Vue } from "vue-class-component";
import { IUserInfo, userStore } from '../user/store';


export interface IAuthenticator {
    messageListener(e: MessageEvent): void;
}

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

    fullscreen = false;

    get open(): boolean {
        return this.modelValue
    }

    set open(v) {
        this.$emit("update:modelValue", v)
    }

    get user(): IUserInfo | null {
       return userStore.getters.getUser;
    }

    beforeMount() {
        window.addEventListener("message", this.messageListener, false);
    }

    beforeUnmount() {
        window.removeEventListener("message", this.messageListener);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    messageListener(e: MessageEvent): void {
        throw "implement me"
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendMessage(messagebody: any) {
        (this.$refs.handler as HTMLIFrameElement).contentWindow!.postMessage(messagebody, window.location.origin);
    }
}