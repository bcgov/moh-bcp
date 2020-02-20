import { createFacilityPageRoutes } from './create-facility-page-routing';

describe('CreateFacilityPageRouting', () => {
  it('createFacilityPageRoutes should be defined', () => {
    expect(createFacilityPageRoutes instanceof Array).toBeTruthy();
    expect(createFacilityPageRoutes.length).toBe(5);
  });
});
