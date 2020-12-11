import BaseAuthenticator from "@/components/authenticator/authenticator.vue"
import { IUserInfo, userStore } from '@/components/user/store';
import { JDConfiguration } from '..';

export default class JonDeereAuthenticator extends BaseAuthenticator {

    get producerData() {
        return JDConfiguration!;
    }

    get user(): IUserInfo | null {
        return userStore.getters.getUser;
    }

    protected messagesIn = ["handler-loaded", "handler-user-token-check", "handler-authenticated", "handler-user-registered"];
    protected messagesOut = ["check-user-token", "user-authentication", "register-user"];

    "handler-loaded"(messageData: any) {
        const messagebody = JSON.parse(JSON.stringify(this.producerData));
        messagebody.userId = this.user!.id;
        this.sendMessage("check-user-token", messagebody);
    }

    "handler-user-token-check"(messageData: any) {
        if (!messageData.tokenValid) {
            const messagebody = JSON.parse(JSON.stringify(this.producerData));
            this.sendMessage("user-authentication", messagebody);
        }
        else {
            this.open = false;
            this.$emit("authenticated");
        }
    }

    "handler-authenticated"(messageData: any) {
        const messagebody = JSON.parse(JSON.stringify({
            userid: this.user!.id,
            accessToken: messageData.tokenifo.access_token,
            refreshToken: messageData.tokenifo.refresh_token,
            expiresIn: messageData.tokenifo.expires_in,
            registerUserUrl: this.producerData.registerUserUrl
        }));
        this.sendMessage("register-user", messagebody);
    }

    "handler-user-registered"(messageData: any) {
        if (messageData.registered) {
            this.open = false;
            this.$emit("authenticated");
        }
    }
}