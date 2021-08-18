import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCourseBackOfficeComponent } from './create-course-backoffice.component';



describe('CreateCourseComponent', () => {
  let component: CreateCourseBackOfficeComponent;
  let fixture: ComponentFixture<CreateCourseBackOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCourseBackOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCourseBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
