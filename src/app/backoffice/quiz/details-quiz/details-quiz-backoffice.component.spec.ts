import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsQuizBackOfficeComponent } from './details-quiz-backoffice.component';

describe('DetailsQuizBackOfficeComponent', () => {
  let component: DetailsQuizBackOfficeComponent;
  let fixture: ComponentFixture<DetailsQuizBackOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsQuizBackOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsQuizBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
