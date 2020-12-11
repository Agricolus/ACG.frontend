import { AugmentedActionContext, createStoreModule, State as RootState } from "@/store";
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

//DTO definition
export interface IMachine {
    id: string | null;
    externalId: string;
    userId: string;
    producerCode: string;
    lat: number | null;
    lng: number | null;
    name: string;
    model: string;
    code: string;
    type: string;
    description: string;
    producerCommercialName: string;
    pTime: string | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    otherData: any;
    isRegistered: boolean;
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
interface IMutations<S = IState> { //mutation definition
    setMachinesMutation(state: S, machines: IMachine[]): void;
    setOrUpdateMachineMutation(state: S, machine: IMachine): void;
}

const mutations: MutationTree<IState> & IMutations = { //mutations implementations
    setMachinesMutation(state, machines) {
        state.machines.splice(0, state.machines.length, ...machines);
    },
    setOrUpdateMachineMutation(state, machine) {
        const mi = state.machines.findIndex(m => m.id == machine.id);
        if (mi < 0)
            state.machines.push(machine);
        else
            state.machines.splice(mi, 1, machine);
    }
}


//store action definition
interface IActions {
    setMachines({ commit }: AugmentedActionContext<IState, IMutations>, machines: IMachine[]): void;
    setMachine({ commit }: AugmentedActionContext<IState, IMutations>, machine: IMachine): void;
}


const actions: ActionTree<IState, RootState> & IActions = {
    setMachines({ commit }, machines) {
        commit("setMachinesMutation", machines);
    },
    setMachine({ commit }, machine) {
        commit("setOrUpdateMachineMutation", machine);
    },
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
