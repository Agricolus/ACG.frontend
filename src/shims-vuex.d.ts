import { Store } from '@/store';// path to store file

declare module '@vue/runtime-core' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface ComponentCustomProperties {
    $store: Store;
  }
}