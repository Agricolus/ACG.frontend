import { PRODUCER_CONFIGURATION } from '@/config';
import { Options, Vue } from "vue-class-component";

@Options({
})
export default class ProducerSelect extends Vue {

  producer: string | null = null;

  shwoAutheticator = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  producers: any = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  producerAuthenticator: any = null;


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get producerData(): any {
    return this.producer && this.producers ? this.producers[this.producer] : null
  }
  async selectProducer() {
    //dynamically importing selected producer module
    const { AuthenticatorComponent } = await import(`@/modules/${this.producer}`);
    this.producerAuthenticator = AuthenticatorComponent;
    this.shwoAutheticator = true;
  }

  back() {
    this.$router.back();
  }

  mounted() {
    this.producers = PRODUCER_CONFIGURATION.producers;
  }

  async authenticated() {
    const { MainImportRoute } = await import(`@/modules/${this.producer}`);
    this.$router.push({ name: MainImportRoute })
  }
}

