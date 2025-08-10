import { TestBed } from '@angular/core/testing';

import { SelectedProjectService } from './selected-project';

describe('SelectedProject', () => {
  let service: SelectedProject;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
