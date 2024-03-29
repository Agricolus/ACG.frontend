import CONFIGURATION from '@/config';
import BaseRestService from '@/services/base';
import { IMachine, machinesStore } from '../store/machineStore';


class MachinesServices extends BaseRestService {
    private baseEndpointsUrl: string;

    /**
     *
     */
    constructor() {
        super();
        this.baseEndpointsUrl = CONFIGURATION.api?.apiServerUrl!;
    }

    async getMachines(userId: string): Promise<IMachine[] | null> {
        const machines = await this.get<IMachine[]>(`${this.baseEndpointsUrl}/machines/${userId}`);
        if (machines != null)
            machinesStore.dispatch("setMachines", machines);
        return machines;
    }

    async registerMachine(machine: IMachine): Promise<IMachine | null> {
        const machineR = await this.post<IMachine>(`${this.baseEndpointsUrl}/machines/import/producer`, machine);
        if (machineR != null)
            machinesStore.dispatch("setMachine", machineR);
        return machineR;
    }

    async getMachineMovements(userId: string, machineId: string, params: { intersected?: boolean; start?: Date; end?: Date } | null = null): Promise<any[] | null> {
        return await this.get<any[]>(`${this.baseEndpointsUrl}/machines/${userId}/${machineId}`, params);
    }
}

export const machinesServices = new MachinesServices();