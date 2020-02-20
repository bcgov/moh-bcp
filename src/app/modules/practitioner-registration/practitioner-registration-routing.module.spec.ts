import { PractitionerAssignmentRoutingModule } from './practitioner-registration-routing.module';

describe('PractitionerAssignmentRoutingModule', () => {
  let routingModule: PractitionerAssignmentRoutingModule;

  beforeEach(() => {
    routingModule = new PractitionerAssignmentRoutingModule();
  });

  it('should create an instance', () => {
    expect(routingModule).toBeTruthy();
  });
});
