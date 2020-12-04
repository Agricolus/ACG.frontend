
import registerRoutes from "./route"
// import * as store from "./store"
import authenticator from "./components/authenticator";

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

export const AuthenticatorComponent = authenticator;