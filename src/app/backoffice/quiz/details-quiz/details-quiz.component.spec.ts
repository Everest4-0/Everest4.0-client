import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsQuizComponent } from './details-quiz.component';

describe('DetailsQuizComponent', () => {
  let component: DetailsQuizComponent;
  let fixture: ComponentFixture<DetailsQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
