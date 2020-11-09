import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStepsCompleteComponent } from './form-steps-complete.component';

describe('FormStepsCompleteComponent', () => {
  let component: FormStepsCompleteComponent;
  let fixture: ComponentFixture<FormStepsCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormStepsCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStepsCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
