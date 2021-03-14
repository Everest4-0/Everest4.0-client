import { TestBed } from '@angular/core/testing';

import { CoachingSubscriptionService } from './coaching-subscription.service';

describe('CoachingSubscriptionService', () => {
  let service: CoachingSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoachingSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
