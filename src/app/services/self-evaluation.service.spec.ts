import { TestBed } from '@angular/core/testing';

import { SelfEvaluationService } from './self-evaluation.service';

describe('SelfEvaluationService', () => {
  let service: SelfEvaluationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelfEvaluationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
