import CONFIGURATION from '@/config';
import BaseRestService from '@/services/base';
import { IMachine, machinesActions, machinesStore } from './store';

const mokedData: IMachine[] = [{
    type: "Feature",
    properties: {
        id: "first",
        name: "trattone",
        producer: "landini",
    },
    geometry: {
        type: "Point",
        coordinates: [47.463220, -1.279482]
    }
},
{
    type: "Feature",
    properties: {
        id: "second",
        name: "trattato",
        producer: "lamborgini",
    },
    geometry: {
        type: "Point",
        coordinates: [47.456220, -1.329482]
    }
}];

class MachinesService extends BaseRestService {
    private baseEndpointsUrl: string;

    /**
     *
     */
    constructor() {
        super();
        this.baseEndpointsUrl = CONFIGURATION.api?.apiServerUrl!;
    }

    async getMachines(): Promise<IMachine[]> {
        const machines = await this.get<IMachine[]>(`${this.baseEndpointsUrl}/machines`);
        if (machines)
            machinesStore.dispatch(machinesActions.setMachines, machines);
        else
            machinesStore.dispatch(machinesActions.setMachines, mokedData);
        
        return machines!;
    }
}

export const machinesService = new MachinesService();