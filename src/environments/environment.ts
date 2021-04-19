// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // userModuleApiBaseUrl: 'http://192.168.18.98:8082/',
  // financialModuleApiBaseUrl: 'http://192.168.18.98:8085/',
  // hcmModuleApiBaseUrl: 'http://192.168.18.98:8087/',
  // hcmModuleApiDirectBaseUrl: 'http://192.168.18.98:8087/',
  // imsModuleApiBaseUrl: 'http://192.168.18.98:8089/',
  // BaseUrl: 'http://192.168.18.98:8082/',
  // oldUIBaseUrl: 'http://dev.lci.com:4200/'

  // production: false,
  userModuleApiBaseUrl: 'http://localhost:4100/',
  financialModuleApiBaseUrl: 'http://localhost:8085/',
  hcmModuleApiBaseUrl: 'http://localhost:8087/',
  hcmModuleApiDirectBaseUrl: 'http://localhost:8087/',
  imsModuleApiBaseUrl: 'http://localhost:8089/',
  BaseUrl: 'http://localhost:8082/',
  oldUIBaseUrl: 'http://dev.lci.com:4200/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
