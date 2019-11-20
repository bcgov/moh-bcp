export const environment = {
  production: true,
  bypassModal: false,

  // TODO: REVERT THIS! ENABLED ONLY FOR EASY UX REVIEW FOR JEFF
  bypassGuards: false,
  useDummyData: false,
  api: {
    base: '/bcp/api/bcpIntegration',
    captcha: '/bcp/api/captcha',
    splunk: '/bcp/api/logging'
  },
  links: {
    tbd: 'google.com',
    hibc: 'JavaScript:Void(0);' // TODO: Need link
  }
};
