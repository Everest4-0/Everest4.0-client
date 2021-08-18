import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachingBackOfficeDashboardComponent } from './coaching-backoffice-dashboard.component';

describe('CoachingBackOfficeDashboardComponent', () => {
  let component: CoachingBackOfficeDashboardComponent;
  let fixture: ComponentFixture<CoachingBackOfficeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachingBackOfficeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachingBackOfficeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
