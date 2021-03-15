import { Options, Vue } from "vue-class-component";


@Options({
    props: {
        loading: Boolean,
    },
})
export default class Loader extends Vue {

}