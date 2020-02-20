import { PRACTITIONER_REGISTRATION_PAGES } from './practitioner-registration-route-constants';

describe('PractitionerRegistrationRouteConstants', () => {
  it('PRACTITIONER_REGISTRATION_PAGES should be defined', () => {
    expect(PRACTITIONER_REGISTRATION_PAGES instanceof Object).toBeTruthy();
    expect(PRACTITIONER_REGISTRATION_PAGES.HOME).toBeDefined();
    expect(PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_INFO).toBeDefined();
    expect(PRACTITIONER_REGISTRATION_PAGES.FACILITY_INFO).toBeDefined();
    expect(PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_ASSIGN).toBeDefined();
    expect(PRACTITIONER_REGISTRATION_PAGES.REVIEW).toBeDefined();
    expect(PRACTITIONER_REGISTRATION_PAGES.SUBMISSION).toBeDefined();
  });
});
