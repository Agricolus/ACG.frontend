import { WatchOptions } from 'vue';
import { ActionContext, createStore, DispatchOptions, Module, Store, StoreOptions, SubscribeActionOptions, SubscribeOptions } from 'vuex'

export type State = {}
const mainStore = createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

export default mainStore;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnsafeReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnsafeParameter<T> = T extends (...args: infer P) => any ? P : never;

export type AugmentedActionContext<S, M> = {
  commit<K extends keyof M>(
    key: K,
    payload: UnsafeParameter<M[K]>[1]
  ): UnsafeReturnType<M[K]>;
} & Omit<ActionContext<S, State>, 'commit'>

type AugmentedActionPayload<T, P> = {
  type: T;
  payload: P;
}

export type ModuleStore<S, G, A> = Omit<
  Store<S>,
  'getters' | 'commit' | 'dispatch' | "install" | "replaceState" | "registerModule" | "unregisterModule" | "hasModule" | "hotUpdate" | "watch" | "subscribeAction"
> & {
  dispatch<K extends keyof A>(
    key: K,
    payload: UnsafeParameter<A[K]>[1],
    options?: DispatchOptions
  ): UnsafeReturnType<A[K]>;
} & {
  getters: {
    [K in keyof G]: UnsafeReturnType<G[K]>
  };
} 
& {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch(getter: (state: S, getters: G) => any, cb: (value: any, oldValue: any) => void, options?: WatchOptions<boolean> | undefined): () => void;
} & {
  subscribeAction<K extends keyof A>(fn: SubscribeActionOptions<AugmentedActionPayload<K, UnsafeParameter<A[K]>[1]>, S>, options?: SubscribeOptions | undefined): () => void;
}


export function createStoreModule<S, G, A>(storeprefix: string, storeDefinition: StoreOptions<S>): ModuleStore<S, G, A> {
  mainStore.unregisterModule(storeprefix);
  const module = createStore(storeDefinition) as unknown as  ModuleStore<S, G, A>;
  mainStore.registerModule(storeprefix, storeDefinition as Module<S, State>, { preserveState: true });
  return module;
}