import { CreateFacilityModule } from './create-facility.module';

describe('CreateFacilityModule', () => {
  let createFacilityModule: CreateFacilityModule;

  beforeEach(() => {
    createFacilityModule = new CreateFacilityModule();
  });

  it('should create an instance', () => {
    expect(createFacilityModule).toBeTruthy();
  });
});
