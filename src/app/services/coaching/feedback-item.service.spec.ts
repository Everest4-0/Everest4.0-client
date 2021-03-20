import { TestBed } from '@angular/core/testing';

import { FeedbackItemService } from './feedback-item.service';

describe('FeedbackItemService', () => {
  let service: FeedbackItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedbackItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
