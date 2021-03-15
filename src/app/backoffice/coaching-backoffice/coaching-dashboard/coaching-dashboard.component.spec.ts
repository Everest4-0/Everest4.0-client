import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachingDashboardComponent } from './coaching-dashboard.component';

describe('CoachingDashboardComponent', () => {
  let component: CoachingDashboardComponent;
  let fixture: ComponentFixture<CoachingDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachingDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
