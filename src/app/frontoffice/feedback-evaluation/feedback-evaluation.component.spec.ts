import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackEvaluationComponent } from './feedback-evaluation.component';

describe('FeedbackEvaluationComponent', () => {
  let component: FeedbackEvaluationComponent;
  let fixture: ComponentFixture<FeedbackEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
