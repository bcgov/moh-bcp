import { PractitionerRegistrationModule } from './practitioner-registration.module';

describe('PractitionerRegistrationModule', () => {
  let registrationModule: PractitionerRegistrationModule;

  beforeEach(() => {
    registrationModule = new PractitionerRegistrationModule();
  });

  it('should create an instance', () => {
    expect(registrationModule).toBeTruthy();
  });
});
