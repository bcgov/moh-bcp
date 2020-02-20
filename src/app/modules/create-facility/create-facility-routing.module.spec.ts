import { CreateFacilityRoutingModule } from './create-facility-routing.module';

describe('CreateFacilityRoutingModule', () => {
  let routingModule: CreateFacilityRoutingModule;

  beforeEach(() => {
    routingModule = new CreateFacilityRoutingModule();
  });

  it('should create an instance', () => {
    expect(routingModule).toBeTruthy();
  });
});
