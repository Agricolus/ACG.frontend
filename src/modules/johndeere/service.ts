import BaseRestService from '@/services/base';
import { JDConfiguration } from '.';
import { IMachine, machinesStore } from '../machines/store';

class JohnDeereService extends BaseRestService {
    private baseEndpointsUrl: string;

    /**
     *
     */
    constructor() {
        super();
        this.baseEndpointsUrl = JDConfiguration!.vendorApiEndpoint;
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

    async getDocuments(userId: string): Promise<any[]> {
        const documents = await this.get<any[]>(`${this.baseEndpointsUrl}/documents/${userId}`);
        return documents!;
    }

    async importDocument(userId: string, documentId: string, document: any): Promise<any[]> {
        const res = await this.post<any>(`${this.baseEndpointsUrl}/documents/${userId}/${documentId}`, document);
        return res!;
    }
}

export const producerService = new JohnDeereService();