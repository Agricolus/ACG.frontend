import { AugmentedActionContext, createStoreModule, State as RootState } from "@/store";
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

//DTO definition
export interface IField {
    id: string | null;
    externalId: string;
    userId: string;
    producerCode: string;
    name: string;
    area: number;
    clientId: string;
    boundaries: [number, number][][];
    unpassableBoundaries: [number, number][][];
    modificationTime: Date;
    isRegistered: boolean;
}


//store state definition
interface IState {
    fields: IField[];
}
const state: IState = { //state object with inital state
    fields: []
}


//store getters definition
interface IGetters {
    getField(state: IState): (fieldId: string) => IField | null;
}
const getters: GetterTree<IState, RootState> & IGetters = { //getters implementations
    getField: (state) => (fieldId: string) => state.fields?.find(m => m.id == fieldId) || null
}

//store mutations definition
interface IMutations<S = IState> { //mutation definition
    setFieldsMutation(state: S, fields: IField[]): void;
    setOrUpdateFieldMutation(state: S, machine: IField): void;
}

const mutations: MutationTree<IState> & IMutations = { //mutations implementations
    setFieldsMutation(state, fields) {
        state.fields.splice(0, state.fields.length, ...fields);
    },
    setOrUpdateFieldMutation(state, field) {
        const mi = state.fields.findIndex(m => m.id == field.id);
        if (mi < 0)
            state.fields.push(field);
        else
            state.fields.splice(mi, 1, field);
    }
}


//store action definition
interface IActions {
    setFields({ commit }: AugmentedActionContext<IState, IMutations>, fields: IField[]): void;
    setField({ commit }: AugmentedActionContext<IState, IMutations>, machine: IField): void;
}


const actions: ActionTree<IState, RootState> & IActions = {
    setFields({ commit }, fields) {
        commit("setFieldsMutation", fields);
    },
    setField({ commit }, field) {
        commit("setOrUpdateFieldMutation", field);
    },
}


//store object
const FieldStore: Module<IState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

const STORE_PREFIX = "fields";
//store instance for direct access
export const fieldsStore = createStoreModule<IState, IGetters, IActions>(STORE_PREFIX, FieldStore);
