import { CoachingDurationService } from './coaching-duration.service';
import { TestBed } from '@angular/core/testing';

describe('DurationService', () => {
  let service: CoachingDurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoachingDurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
