import { AugmentedActionContext, createStoreModule, State as RootState } from "@/store";
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

//DTO definition
export interface IClient {
    id: string | null;
    externalId: string;
    userId: string;
    producerCode: string;
    name: string;
    isRegistered: boolean;
}


//store state definition
interface IState {
    clients: IClient[];
}
const state: IState = { //state object with inital state
    clients: []
}


//store getters definition
interface IGetters {
    getClient(state: IState): (clientId: string) => IClient | null;
}
const getters: GetterTree<IState, RootState> & IGetters = { //getters implementations
    getClient: (state) => (clientId: string) => state.clients?.find(m => m.id == clientId) || null
}

//store mutations definition
interface IMutations<S = IState> { //mutation definition
    setClientsMutation(state: S, machines: IClient[]): void;
    setOrUpdateClientMutation(state: S, machine: IClient): void;
}

const mutations: MutationTree<IState> & IMutations = { //mutations implementations
    setClientsMutation(state, clients) {
        state.clients.splice(0, state.clients.length, ...clients);
    },
    setOrUpdateClientMutation(state, client) {
        const mi = state.clients.findIndex(m => m.id == client.id);
        if (mi < 0)
            state.clients.push(client);
        else
            state.clients.splice(mi, 1, client);
    }
}


//store action definition
interface IActions {
    setClients({ commit }: AugmentedActionContext<IState, IMutations>, clients: IClient[]): void;
    setClient({ commit }: AugmentedActionContext<IState, IMutations>, client: IClient): void;
}


const actions: ActionTree<IState, RootState> & IActions = {
    setClients({ commit }, clients) {
        commit("setClientsMutation", clients);
    },
    setClient({ commit }, client) {
        commit("setOrUpdateClientMutation", client);
    },
}


//store object
const ClientsStore: Module<IState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

const STORE_PREFIX = "clients";
//store instance for direct access
export const clientsStore = createStoreModule<IState, IGetters, IActions>(STORE_PREFIX, ClientsStore);
