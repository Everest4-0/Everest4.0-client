import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationRequestComponent } from './evaluation-request.component';

describe('EvaluationRequestComponent', () => {
  let component: EvaluationRequestComponent;
  let fixture: ComponentFixture<EvaluationRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
