// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  bypassModal: false,
  bypassGuards: true,
  useDummyData: true,
  useMockBackend: true,
  api: {
    base: '/bcp/api/bcpIntegration',
    captcha: '/bcp/api/captcha',
    splunk: '/bcp/api/logging',
    attachment: '/bcp/api/bcpAttachment'
  },
  links: {
    tbd: 'google.com',
    hibc: 'JavaScript:Void(0);' // TODO: Need link
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
