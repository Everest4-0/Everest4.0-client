import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCourseComponent } from './activity-course.component';

describe('ActivityCourseComponent', () => {
  let component: ActivityCourseComponent;
  let fixture: ComponentFixture<ActivityCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
