import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuizBackOfficeComponent } from './update-quiz-backoffice.component';

describe('UpdateQuizBackOfficeComponent', () => {
  let component: UpdateQuizBackOfficeComponent;
  let fixture: ComponentFixture<UpdateQuizBackOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateQuizBackOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateQuizBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
