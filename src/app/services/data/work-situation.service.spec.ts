import { TestBed } from '@angular/core/testing';

import { WorkSituationService } from './work-situation.service';

describe('WorkSituationService', () => {
  let service: WorkSituationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkSituationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
