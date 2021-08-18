import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListQuizBackOfficeComponent } from './list-quiz-backoffice.component';



describe('ListQuizBackOfficeComponent', () => {
  let component: ListQuizBackOfficeComponent;
  let fixture: ComponentFixture<ListQuizBackOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListQuizBackOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListQuizBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
