import { createApp, watch } from 'vue'
import "./assets/site.less"
import CONFIGURATION, { ConfigurationStatus, PRODUCER_CONFIGURATION } from './config'

//configuration loading
const startupWathcer = watch(() => [CONFIGURATION.status, PRODUCER_CONFIGURATION.status], async ([generalConfigStatus, producerConfigStatus]) => {
    if (generalConfigStatus == ConfigurationStatus.ready && producerConfigStatus == ConfigurationStatus.ready) {

        const { securityService } = await import("./services/securityService");
        //security checks
        const secured = await securityService.accessTokenCapture();
        if (!secured) return
        

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
        
        const { default: store } = await import("./store");
        acgApp.use(store);

        const { default: router } = await import("./router");
        acgApp.use(router);

        //moules import
        await import("@/modules/machines");

        acgApp.mount('#app');

        //startup watcher cleanup
        startupWathcer();
    }
}, { immediate: true });
