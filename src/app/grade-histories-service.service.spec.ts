import { TestBed } from '@angular/core/testing';

import { GradeHistoriesServiceService } from './grade-histories-service';

describe('GradeHistoriesServiceService', () => {
  let service: GradeHistoriesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradeHistoriesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
