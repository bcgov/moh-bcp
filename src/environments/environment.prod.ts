export const environment = {
  production: true,
  bypassModal: false,

  // TODO: REVERT THIS! ENABLED ONLY FOR EASY UX REVIEW FOR JEFF
  bypassGuards: false,
  useDummyData: false,


  useMockBackend: false,
  api: {
    base: '/bcp/api/bcpIntegration',
    captcha: '/bcp/api/captcha',
    splunk: '/bcp/api/logging',
    attachment: '/bcp/api/bcpAttachment'
  },
  links: {
    tbd: 'google.com',
    hibc: 'JavaScript:Void(0);', // TODO: Need link
    contactUs: 'http://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents-contact-us',
  }
};
