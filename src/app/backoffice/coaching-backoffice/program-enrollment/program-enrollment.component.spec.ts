import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramEnrollmentComponent } from './program-enrollment.component';

describe('ProgramEnrollmentComponent', () => {
  let component: ProgramEnrollmentComponent;
  let fixture: ComponentFixture<ProgramEnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramEnrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
