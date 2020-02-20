import { CREATE_FACILITY_PAGES } from './create-facility-route-constants';

describe('CreateFacilityRouteConstants', () => {
  it('CREATE_FACILITY_PAGES should be defined', () => {
    expect(CREATE_FACILITY_PAGES instanceof Object).toBeTruthy();
    expect(CREATE_FACILITY_PAGES.HOME).toBeDefined();
    expect(CREATE_FACILITY_PAGES.FACILITY_ADMIN).toBeDefined();
    expect(CREATE_FACILITY_PAGES.FACILITY_INFO).toBeDefined();
    expect(CREATE_FACILITY_PAGES.REVIEW).toBeDefined();
    expect(CREATE_FACILITY_PAGES.SUBMISSION).toBeDefined();
  });
});
