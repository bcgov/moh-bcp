import { TestBed } from '@angular/core/testing';

import { SplunkLoggerService } from './splunk-logger.service';

describe('SplunkLoggerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SplunkLoggerService = TestBed.get(SplunkLoggerService);
    expect(service).toBeTruthy();
  });
});
