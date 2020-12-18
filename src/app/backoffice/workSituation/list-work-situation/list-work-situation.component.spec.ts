import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWorkSituationComponent } from './list-work-situation.component';

describe('ListWorkSituationComponent', () => {
  let component: ListWorkSituationComponent;
  let fixture: ComponentFixture<ListWorkSituationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListWorkSituationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWorkSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
