import { createApp, watch } from 'vue'

import CONFIGURATION, { ConfigurationStatus } from './config'

//access token check
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("access_token")) {
    console.debug("access token received", urlParams.get("access_token"));
    localStorage.setItem("access_token", urlParams.get("access_token") || "");
    urlParams.delete("access_token");
    const urlParamsString = urlParams.toString();
    const url = window.location.origin + window.location.pathname + (urlParamsString ? "?" + urlParamsString : "");
    window.history.replaceState(null, "", url);
}

//configuration loading
const startupWathcer = watch(() => CONFIGURATION.status, async (status) => {
    if (status == ConfigurationStatus.ready) {

        const userService = await import("./services/userService");
        const userinfo = await userService.default.getUserInfo();
        console.debug(userinfo);
        if (userinfo == null) return; //we can't retrieve user informations


        //application startup
        const appcomponent = await import("./App.vue");
        const acgApp = createApp(appcomponent.default);
        acgApp.mixin({
            methods: {
                localize(placeholder: string): string {
                    return placeholder;
                }
            }
        });

        const store = await import("./store");
        acgApp.use(store.default);

        const router = await import("./router");
        acgApp.use(router.default);
        
        acgApp.mount('#app');

        //startup watcher cleanup
        startupWathcer();
    }
}, { immediate: true });

