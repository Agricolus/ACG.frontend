import BaseRestService from '@/services/base';
import { IClient } from '@/store/clientStore';
import { fieldsStore, IField } from '@/store/fieldStore';
import { JDConfiguration } from '.';
import { IMachine, machinesStore } from '../../store/machineStore';

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

  async machineLocationHistory(userId: string, machineId: string): Promise<{point: {lat: number; lon: number}}[] | null> {
    const machineR = await this.get<{point: {lat: number; lon: number}}[] | null>(`${this.baseEndpointsUrl}/machines/${userId}/${machineId}`);
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

  async getFields(userId: string): Promise<{fields: IField[]; clients: IClient[]}> {
    const fields = await this.get<{fields: IField[]; clients: IClient[]}>(`${this.baseEndpointsUrl}/fields/${userId}`);
    return fields!;
  }

  async registerField(userId: string, field: any): Promise<IField> {
    const fieldR = await this.post<IField>(`${this.baseEndpointsUrl}/fields/${userId}`, field);
    if (fieldR != null)
      fieldsStore.dispatch("setField", fieldR);
    return fieldR!;
  }

  async registerFields(userId: string, field: any[]): Promise<IField[]> {
    const fields = await this.post<IField[]>(`${this.baseEndpointsUrl}/fields/${userId}/bulk`, field);
    return fields!;
  }
}

export const producerService = new JohnDeereService();