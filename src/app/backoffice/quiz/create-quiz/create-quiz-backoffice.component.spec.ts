import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateQuizBackOfficeComponent } from './create-quiz-backoffice.component';


describe('CreateQuizBackOfficeComponent', () => {
  let component: CreateQuizBackOfficeComponent;
  let fixture: ComponentFixture<CreateQuizBackOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQuizBackOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQuizBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
