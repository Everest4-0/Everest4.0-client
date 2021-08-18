import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListCourseBackOfficeComponent } from './list-course-backoffice.component';



describe('ListCourseComponent', () => {
  let component: ListCourseBackOfficeComponent;
  let fixture: ComponentFixture<ListCourseBackOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCourseBackOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCourseBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
