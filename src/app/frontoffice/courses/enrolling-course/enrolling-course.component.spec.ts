import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollingCourseComponent } from './enrolling-course.component';

describe('EnrollingCourseComponent', () => {
  let component: EnrollingCourseComponent;
  let fixture: ComponentFixture<EnrollingCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollingCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollingCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
