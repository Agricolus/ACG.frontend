import { reactive, readonly } from 'vue';
export enum ConfigurationStatus {
  ready = "ready",
  fetched = "fetched",
  fetching = "fetching",
  starting = "starting"
}

export interface IConfiguration {
  status: ConfigurationStatus;
  env?: string;
  auth?: {
    isAuthenticationNeeded: boolean;
    authenticationServerUrl: string;
    redirectUrl: string;
    refreshTokenUrl: string;
    clientId: string;
  };
  api?: {
    apiServerUrl: string;
  };
}

const configpath = "/config.".concat(process.env.NODE_ENV).concat(".json");

//we keep the modifiable reactive configuration object inside the module
const configuration: IConfiguration = reactive<IConfiguration>({
  status: ConfigurationStatus.starting,
});

//but we export a readonly reactive version of the config
const CONFIGURATION = readonly(configuration);
export default CONFIGURATION;

configuration.status = ConfigurationStatus.fetching;

fetch(configpath).then((response) => {
  configuration.status = ConfigurationStatus.fetched;
  response.json().then<IConfiguration>(conf => {
    configuration.status = ConfigurationStatus.ready;
    return Object.assign(configuration, conf);
  }, () => {
    throw "Catastrofic error! invalid configuration found on ".concat(configpath);
  });
}, () => {
  throw "Catastrofic error! unable to load ".concat(configpath);
});


