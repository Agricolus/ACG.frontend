import CONFIGURATION from '@/config';
import BaseRestService from "./base";

class UserService extends BaseRestService {
    private baseEndpointsUrl: string;
    private token: string | null;

    /**
     *
     */
    constructor() {
        super();
        this.baseEndpointsUrl = "http://dockerdev.agricolus.com:3000";
        this.token = localStorage.getItem("access_token");
    }

    async getUserInfo() {
        try {
            return await this.get(`${this.baseEndpointsUrl}/user?access_token=${this.token}`);
        }
        catch (e) {
            console.debug(e);
            if (e == "unhautorized") {
                const authurl = CONFIGURATION.auth?.authenticationServerUrl;
                const clientid = CONFIGURATION.auth?.clientId;
                const currenturl = window.location.href;
                const redirect = CONFIGURATION.auth?.redirectUrl;
                window.location.href = `${authurl}?response_type=code&client_id=${clientid}&state=${currenturl}&redirect_uri=${redirect}`;
            }
            return null;
        }
    }
}

export default new UserService();