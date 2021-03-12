import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachingFeedbackComponent } from './coaching-feedback.component';

describe('CoachingFeedbackComponent', () => {
  let component: CoachingFeedbackComponent;
  let fixture: ComponentFixture<CoachingFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachingFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachingFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
