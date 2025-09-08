import { TestBed } from '@angular/core/testing';

import { ArchivedProjectsService } from './archived-projects-service';

describe('ArchivedProjects', () => {
  let service: ArchivedProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchivedProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
