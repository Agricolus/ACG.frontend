
import registerRoutes from "./route"
import * as store from "./store"
import * as service from "./service"

registerRoutes();

export default {
    store,
    service
}