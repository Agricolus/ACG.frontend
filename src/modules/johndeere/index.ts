
import registerRoutes from "./route"
// import * as store from "./store"
import authenticator from "./components/authenticator";

registerRoutes();

export const AuthenticatorComponent = authenticator;