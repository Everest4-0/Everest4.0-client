import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachingEvolutionComponent } from './coaching-evolution.component';

describe('CoachingEvolutionComponent', () => {
  let component: CoachingEvolutionComponent;
  let fixture: ComponentFixture<CoachingEvolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachingEvolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachingEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
