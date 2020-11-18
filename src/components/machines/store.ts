import { AugmentedActionContext, createStoreModule, State as RootState } from "@/store";
import { Feature, Point } from 'geojson';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

//DTO definition
export interface IMachine extends Feature<Point> {
    properties: {
        id: string;
        name: string;
        producer: string;
    };
}

//store state definition
interface IState {
    machines: IMachine[];
}
const state: IState = { //state object with inital state
    machines: []
}


//store getters definition
interface IGetters {
    getMachine(state: IState): (machineId: string) => IMachine | null; 
}
const getters: GetterTree<IState, RootState> & IGetters = { //getters implementations
    getMachine: (state) => (machineId: string) => state.machines?.find(m => m.id == machineId) || null
}

//store mutations definition
enum Mutations { //mutations names
    setMachines = "set_machines_mutation"
}

interface IMutations<S = IState> { //mutation definition
    [Mutations.setMachines](state: S, machines: IMachine[]): void;
}

const mutations: MutationTree<IState> & IMutations = { //mutations implementations
    [Mutations.setMachines](state, machines) {
        state.machines = machines
    }
}


//store action definition
enum Actions {
    setMachines = "set_machines_action"
}

interface IActions {
    [Actions.setMachines]({ commit }: AugmentedActionContext<IState, IMutations>, machines: IMachine[]): void;
}


const actions: ActionTree<IState, RootState> & IActions = {
    [Actions.setMachines]({commit}, machines) {
        commit(Mutations.setMachines, machines);
    }
}


//store object
const MachinesStore: Module<IState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

const STORE_PREFIX = "machines";
//store instance for direct access
export const machinesStore = createStoreModule<IState, IGetters, IActions>(STORE_PREFIX, MachinesStore);

//exposing the actions names for store consumer
export const machinesActions = Actions;
