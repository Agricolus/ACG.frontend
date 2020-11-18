import { Options, Vue } from 'vue-class-component';

import info from "./user/info.vue";

@Options({
    components: {
        info
    }
})
export default class Home extends Vue {
    
}