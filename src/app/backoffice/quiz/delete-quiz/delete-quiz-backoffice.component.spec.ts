import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteQuizBackOfficeComponent } from './delete-quiz-backoffice.component';

describe('DeleteQuizBackOfficeComponent', () => {
  let component: DeleteQuizBackOfficeComponent;
  let fixture: ComponentFixture<DeleteQuizBackOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteQuizBackOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteQuizBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
