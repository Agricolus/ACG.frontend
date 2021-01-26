import CONFIGURATION from "@/config";
import { securityService } from './securityService';

export default class BaseRestService {
    private static accessToken: string | null = null;

    /**
     *
     */
    constructor() {
        BaseRestService.accessToken = securityService.tokenInfo?.access_token || null;
    }

    private get initGetRequest(): RequestInit {
        const headers = new Headers();
        headers.set("Accept", "application/json");
        if (BaseRestService.accessToken) {
            headers.set("Authorization", `Bearer ${BaseRestService.accessToken}`);
            // headers.set("X-Auth-Token", BaseRestService.accessToken);
        }
        return {
            method: "GET",
            headers,
        }
    }

    private get initPostRequest(): RequestInit {
        const headers = new Headers();
        headers.set("Accept", "application/json");
        headers.set("Content-Type", "application/json");
        if (BaseRestService.accessToken) {
            headers.set("Authorization", `Bearer ${BaseRestService.accessToken}`);
            // headers.set("X-Auth-Token", BaseRestService.accessToken);
        }
        return {
            method: "POST",
            headers,
        }
    }

    private async handle401() {
        if (CONFIGURATION.auth?.isAuthenticationNeeded) {
            console.debug("unhautorized api access");
            throw "unhautorized";
        }
    }

    private async checkToken() {
        const procede = await securityService.checkToken();
        if (!procede) throw "security not valid";
    }

    protected async get<T>(resourceUrl: string, queryParams: { [key: string]: any } | null = null): Promise<T | null> {
        await this.checkToken();
        if (queryParams)
            resourceUrl += '?' + new URLSearchParams(JSON.parse(JSON.stringify(queryParams)));
        const request = new Request(resourceUrl, this.initGetRequest);
        const response = await fetch(request);
        if (!response.ok && response.status == 401)
            await this.handle401();
        if (response.ok) return response.json() as Promise<T>;
        return null;
    }

    protected async post<T>(resourceUrl: string, data: unknown): Promise<T | null> {
        await this.checkToken();
        const init = this.initPostRequest;
        init.body = JSON.stringify(data);
        const request = new Request(resourceUrl, init);
        const response = await fetch(request);
        if (!response.ok && response.status == 401)
            await this.handle401();
        if (response.ok) return response.json() as Promise<T>;
        return null;
    }
}
