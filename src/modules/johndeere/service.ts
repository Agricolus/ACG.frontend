/* eslint-disable @typescript-eslint/no-explicit-any */
import CONFIGURATION from '@/config';
import BaseRestService from '@/services/base';
// import { IMachine, machinesStore } from './store';

// const mokedData: IMachine[] = [{
//     type: "Feature",
//     properties: {
//         id: "first",
//         name: "trattone",
//         producer: "landini",
//     },
//     geometry: {
//         type: "Point",
//         coordinates: [47.463220, -1.279482]
//     }
// },
// {
//     type: "Feature",
//     properties: {
//         id: "second",
//         name: "trattato",
//         producer: "lamborgini",
//     },
//     geometry: {
//         type: "Point",
//         coordinates: [47.456220, -1.329482]
//     }
// }];

class JohnDeereService extends BaseRestService {
    private baseEndpointsUrl: string;

    /**
     *
     */
    constructor() {
        super();
        this.baseEndpointsUrl = "https://dockerdev.agricolus.com:5008/johndeere";
    }

    async getMachines(userId: string): Promise<any[]> {
        const machines = await this.get<any[]>(`${this.baseEndpointsUrl}/machines/${userId}`);       
        return machines!;
    }
}

export const producerService = new JohnDeereService();