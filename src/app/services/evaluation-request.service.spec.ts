import { TestBed } from '@angular/core/testing';

import { EvaluationRequestService } from './evaluation-request.service';

describe('EvaluationRequestService', () => {
  let service: EvaluationRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
