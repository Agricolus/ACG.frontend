import { IAuthenticator } from '@/components/authenticator/authenticator';
import authenticator from "@/components/authenticator/authenticator.vue"

export default class JonDeereAuthenticator extends authenticator implements IAuthenticator {

    private messagesIn = ["handler-loaded", "handler-user-token-check", "handler-authenticated", "handler-user-registered"];
    private messagesOut = ["check-user-token", "user-authentication", "register-user"];
    messageListener(e: MessageEvent): void {
        if (e.origin != window.location.origin) return;
        if (this.messagesIn.indexOf(e.data?.type) < 0) return;
        if (e.data.type == "handler-loaded") {
            const payload = JSON.parse(JSON.stringify(this.producerData));
            payload.userId = this.user!.id;
            const messagebody = {
                type: "check-user-token",
                payload
            };
            this.sendMessage(messagebody);
        }
        if (e.data.type == "handler-user-token-check") {
            if (!e.data.tokenValid) {
                const payload = JSON.parse(JSON.stringify(this.producerData));
                const messagebody = {
                    type: "user-authentication",
                    payload
                };
                this.sendMessage(messagebody);
            }
            else {
                this.open = false;
                this.$router.push({ name: "johndeere:machines:import" });
            }
        }
        if (e.data.type == "handler-authenticated") {
            const payload = JSON.parse(JSON.stringify({
                userid: this.user!.id,
                accessToken: e.data.tokenifo.access_token,
                refreshToken: e.data.tokenifo.refresh_token,
                expiresIn: e.data.tokenifo.expires_in,
                registerUserUrl: this.producerData.registerUserUrl
            }));
            const messagebody = {
                type: "register-user",
                payload
            };
            this.sendMessage(messagebody);
        }
        if (e.data.type == "handler-user-registered") {
            if (e.data.registered) {
                this.open = false;
                this.$router.push({ name: "johndeere:machines:import" });
            }
        }
    }

}