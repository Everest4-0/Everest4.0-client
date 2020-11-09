import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStepsTemplateComponent } from './form-steps-template.component';

describe('FormStepsTemplateComponent', () => {
  let component: FormStepsTemplateComponent;
  let fixture: ComponentFixture<FormStepsTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormStepsTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStepsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
