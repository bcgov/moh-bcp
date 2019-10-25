export const environment = {
  production: true,
  bypassModal: false,

  // TODO: REVERT THIS! ENABLED ONLY FOR EASY UX REVIEW FOR JEFF
  bypassGuards: false,
  useDummyData: false,
  api: {
    base: '/bcp/api',
    captcha: '/bcp/api/captcha',
    splunk: '/bcp/api/logging'
  },
  links: {
    tbd: 'google.com'
  }
};
