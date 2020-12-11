
import registerRoutes from "./route"
// import * as store from "./store"
import authenticator from "./components/authenticator";
import { producerConfiguration } from '@/config';

registerRoutes();

export interface IJDConfiguration{
    vendorApiEndpoint: string;
    handlerSrc: string;
    commercialName: string;
    wellknownUrl: string;
    organizatinUrl: string;
    redirectUrl: string;
    clientId: string;
    scopes: string;
    registerUserUrl: string;
    checkTokenUrl: string;
}

export const JDConfiguration = producerConfiguration<IJDConfiguration>("johndeere");

export const AuthenticatorComponent = authenticator;

export const MachineImportRouteName = "johndeere:machines:import";

export const DocumentImportRouteName = "johndeere:documents:import";