import CONFIGURATION, { ConfigurationStatus } from '@/config';

const TOKEN_INFO_LOCAL_STORAGE = "_keyrock_token_info";
const TOKEN_INFO_PARAMETER = "_keyrock_token_response";

export interface IKeyrockTokenInfo {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    received: number;
}

export class TokenError extends Error { }

class SecurityService {

    constructor() {
        if (CONFIGURATION.status != ConfigurationStatus.ready) throw new Error("no configuration");
    }

    async accessTokenCapture(): Promise<boolean> {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has(TOKEN_INFO_PARAMETER)) {
            const tokenifo = JSON.parse(urlParams.get(TOKEN_INFO_PARAMETER)!) as IKeyrockTokenInfo;
            tokenifo.received = new Date().getTime() / 1000; //registering de received time
            localStorage.setItem(TOKEN_INFO_LOCAL_STORAGE, JSON.stringify(tokenifo)); //store the token info into local storage
            //cleaning up the url
            urlParams.delete(TOKEN_INFO_PARAMETER);
            const urlParamsString = urlParams.toString();
            const url = window.location.origin + window.location.pathname + (urlParamsString ? "?" + urlParamsString : "");
            window.history.replaceState(null, "", url);
        }
        return await this.checkToken();
    }

    async checkToken(): Promise<boolean> {
        const tokenInfo = this.tokenInfo;
        if (!tokenInfo) {
            this.startLogin();
            return false;
        }
        if (this.checkTokenRefresh()) {
            const refreshed = await this.refreshToken();
            if (!refreshed) {
                this.startLogin();
                return false;
            }
        }
        return true;
    }

    get tokenInfo(): IKeyrockTokenInfo | null {
        const ti = localStorage.getItem(TOKEN_INFO_LOCAL_STORAGE);
        // if (ti == null) throw new TokenError("no access token");
        return JSON.parse(ti || "null");
    }

    startLogin(): void {
        const authurl = CONFIGURATION.auth?.authenticationServerUrl;
        const clientid = CONFIGURATION.auth?.clientId;
        const currenturl = window.location.href;
        const redirect = CONFIGURATION.auth?.redirectUrl;
        window.location.href = `${authurl}/oauth2/authorize?response_type=code&client_id=${clientid}&state=${currenturl}&redirect_uri=${redirect}`;
    }

    async refreshToken(): Promise<boolean> {
        if (!this.tokenInfo) throw Error("no access token");
        const refreshToken = this.tokenInfo.refresh_token;
        const refreshUrl = CONFIGURATION.auth?.refreshTokenUrl;
        const newTokenResponse = await fetch(`${refreshUrl}?refreshToken=${refreshToken}`);
        if (!newTokenResponse.ok) return false;
        const newToken = await newTokenResponse.json() as IKeyrockTokenInfo;
        newToken.received = new Date().getTime() / 1000; //registering de received time
        localStorage.setItem(TOKEN_INFO_LOCAL_STORAGE, JSON.stringify(newToken)); //store the token info into local storage
        return true;
    }

    checkTokenRefresh(): boolean {
        if (!this.tokenInfo) throw Error("no access token");
        const ts = new Date().getTime() / 1000;
        return (this.tokenInfo.received + (this.tokenInfo.expires_in || 0)) < ts;
    }

}

export const securityService = new SecurityService();