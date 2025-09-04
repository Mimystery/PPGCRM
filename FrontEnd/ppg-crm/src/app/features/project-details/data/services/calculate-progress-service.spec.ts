import { TestBed } from '@angular/core/testing';

import { CalculateProgressService } from './calculate-progress-service';

describe('CalculateProgressService', () => {
  let service: CalculateProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
