import CONFIGURATION from '@/config';
import BaseRestService from '@/services/base';
import { IField, fieldsStore } from '../store/fieldStore';


class FieldsServices extends BaseRestService {
    private baseEndpointsUrl: string;

    /**
     *
     */
    constructor() {
        super();
        this.baseEndpointsUrl = CONFIGURATION.api?.apiServerUrl!;
    }

    async getFields(userId?: string): Promise<IField[]|null> {
        const fields = await this.get<IField[]>(`${this.baseEndpointsUrl}/fields/${userId}`);
        if (fields != null)
            fieldsStore.dispatch("setFields", fields);
        return fields;
    }

    async registerField(field: IField): Promise<IField|null> {
        const fieldR = await this.post<IField>(`${this.baseEndpointsUrl}/fields/import/producer`, field);
        if (fieldR != null)
            fieldsStore.dispatch("setField", fieldR);
        return fieldR;
    }
}

export const fieldsServices = new FieldsServices();