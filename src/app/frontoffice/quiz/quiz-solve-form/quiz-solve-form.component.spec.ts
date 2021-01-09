import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSolveFormComponent } from './quiz-solve-form.component';

describe('QuizSolveFormComponent', () => {
  let component: QuizSolveFormComponent;
  let fixture: ComponentFixture<QuizSolveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizSolveFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizSolveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
