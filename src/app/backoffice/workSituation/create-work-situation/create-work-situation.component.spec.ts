import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkSituationComponent } from './create-work-situation.component';

describe('CreateWorkSituationComponent', () => {
  let component: CreateWorkSituationComponent;
  let fixture: ComponentFixture<CreateWorkSituationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWorkSituationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
