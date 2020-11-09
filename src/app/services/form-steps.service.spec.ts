import { TestBed } from '@angular/core/testing';

import { FormStepsService } from './form-steps.service';

describe('FormStepsService', () => {
  let service: FormStepsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormStepsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
