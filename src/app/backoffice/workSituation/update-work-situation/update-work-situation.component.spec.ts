import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWorkSituationComponent } from './update-work-situation.component';

describe('UpdateWorkSituationComponent', () => {
  let component: UpdateWorkSituationComponent;
  let fixture: ComponentFixture<UpdateWorkSituationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateWorkSituationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWorkSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
