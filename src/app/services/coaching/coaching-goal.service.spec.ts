import { TestBed } from '@angular/core/testing';

import { CoachingGoalService } from './coaching-goal.service';

describe('GoalService', () => {
  let service: CoachingGoalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoachingGoalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
