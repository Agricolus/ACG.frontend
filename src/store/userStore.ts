import { AugmentedActionContext, createStoreModule, State as RootState } from "@/store";
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

export interface IUserInfo {
    app_azf_domain: string;
    app_id: string;
    attributes: unknown;
    authorization_decision: string;
    displayName: string;
    eidas_profile: unknown;
    email: string;
    id: string;
    image: string;
    isGravatarEnabled: boolean;
    organizations: unknown[];
    roles: { id: string; name: string }[];
    trusted_apps: unknown[];
    username: string;
}


//store state definition
interface IState {
    userInfo: IUserInfo | null;
}
const state: IState = { //state object with inital state
    userInfo: null
}


//store getters definition
interface IGetters {
    getUser(state: IState): IUserInfo | null;
}

const getters: GetterTree<IState, RootState> & IGetters = { //getters implementations
    getUser: state => state.userInfo
}

//store mutations definition
enum Mutations { //mutations names
    setUser = "set_user_mutation",
    foo = "foo"
}

interface IMutations { //mutation definition
    [Mutations.setUser](state: IState, userInfo: IUserInfo): void;
    [Mutations.foo](state: IState): void;
}



const mutations: MutationTree<IState> & IMutations = { //mutations implementations
    [Mutations.setUser](state, userInfo) {
        state.userInfo = userInfo
    },
    [Mutations.foo](state) {
        console.log(state);
    }
}


//store action definition
enum Actions { //actions names
    setUser = "set_user_action"
}

interface IActions { //actions definitions
    [Actions.setUser]({ commit }: AugmentedActionContext<IState, IMutations>, userInfo: IUserInfo): void;
}


const actions: ActionTree<IState, RootState> & IActions = { //action implementations
    [Actions.setUser]({ commit }, userInfo) {
        commit(Mutations.setUser, userInfo);
    }
}


//store object
const UserStore: Module<IState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

//store instance for direct access
// export const userStore = createStore(UserStore) as ModuleStore<IState, IGetters, IActions, IMutations, RootState>;
const STORE_PREFIX = "user";
export const userStore = createStoreModule<IState, IGetters, IActions>(STORE_PREFIX, UserStore);

//exposing the actions names for store consumer
export const userActions = Actions;


