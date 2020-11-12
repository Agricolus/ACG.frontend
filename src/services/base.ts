import CONFIGURATION from "@/config";

export default class BaseRestService {
    private static accessToken: string | null = null;

    /**
     *
     */
    constructor() {
        BaseRestService.accessToken = localStorage.getItem("access_token");
    }

    private get initGetRequest(): RequestInit {
        const headers = new Headers();
        headers.set("Accept", "application/json");
        if (BaseRestService.accessToken) {
            // headers.set("Authorization", `Bearer ${BaseRestService.accessToken}`);
            headers.set("X-Auth-Token", BaseRestService.accessToken);
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
            // headers.set("Authorization", `Bearer ${BaseRestService.accessToken}`);
            headers.set("X-Auth-Token", BaseRestService.accessToken);
        }
        return {
            method: "POST",
            headers,
        }
    }

    private handle401() {
        if (CONFIGURATION.auth?.isAuthenticationNeeded) {
            console.debug("unhautorized api access");
            throw "unhautorized";
        }
    }

    async get<T>(resourceUrl: string): Promise<T> {
        const request = new Request(resourceUrl, this.initGetRequest);
        const response = await fetch(request);
        if (!response.ok && response.status == 401)
            this.handle401();
        return response.json() as Promise<T>;
    }

    async post<T>(resourceUrl: string, data: unknown): Promise<T> {
        const init = this.initPostRequest;
        init.body = JSON.stringify(data);
        const request = new Request(resourceUrl, this.initPostRequest);
        const response = await fetch(request);
        if (!response.ok && response.status == 401)
            this.handle401();
        return response.json() as Promise<T>;
    }
}
