import { pages } from './practitioner-registration-page-routes';

describe('PractitionerRegistrationPageRoutes', () => {
  it('pages should be defined', () => {
    expect(pages instanceof Array).toBeTruthy();
    expect(pages.length).toBe(6);
  });
});
