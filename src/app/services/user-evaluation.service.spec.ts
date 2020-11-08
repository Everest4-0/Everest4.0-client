import { TestBed } from '@angular/core/testing';

import { UserEvaluationService } from './user-evaluation.service';

describe('UserEvaluationService', () => {
  let service: UserEvaluationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserEvaluationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
