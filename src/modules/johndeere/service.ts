import BaseRestService from '@/services/base';
import { IMachine, machinesStore } from '../machines/store';

class JohnDeereService extends BaseRestService {
    private baseEndpointsUrl: string;

    /**
     *
     */
    constructor() {
        super();
        this.baseEndpointsUrl = "https://dockerdev.agricolus.com:5008/johndeere";
    }

    async getMachines(userId: string): Promise<IMachine[]> {
        const machines = await this.get<IMachine[]>(`${this.baseEndpointsUrl}/machines/${userId}`);
        return machines!;
    }

    async registerMachine(userId: string, machine: IMachine): Promise<IMachine | null> {
        const machineR = await this.post<IMachine>(`${this.baseEndpointsUrl}/machines/${userId}/${machine.id}`, machine);
        if (machineR != null)
            machinesStore.dispatch("setMachine", machineR);
        return machineR;
    }
}

export const producerService = new JohnDeereService();