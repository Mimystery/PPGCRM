import { TestBed } from '@angular/core/testing';

import { CalculateSalaryService } from './calculate-salary-service';

describe('CalculateSalaryService', () => {
  let service: CalculateSalaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateSalaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
