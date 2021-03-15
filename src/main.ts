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

        const { userServices }  = await import('@/services/userServices');
        await userServices.getUserInfo();

        //application startup
        const appcomponent = await import("./App.vue");
        const acgApp = createApp(appcomponent.default);
        //global localization mixin
        acgApp.mixin({
            methods: {
                localize(placeholder: string): string {
                    return placeholder; //dummy localization function
                }
            }
        });
        
        const { default: store } = await import("./store");
        acgApp.use(store);

        const { default: router } = await import("./router");
        acgApp.use(router);

        

        acgApp.mount('#app');

        //startup watcher cleanup
        startupWathcer();
    }
}, { immediate: true });
