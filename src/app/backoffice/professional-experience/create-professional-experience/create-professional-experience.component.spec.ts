import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProfessionalExperienceComponent } from './create-professional-experience.component';

describe('CreateProfessionalExperienceComponent', () => {
  let component: CreateProfessionalExperienceComponent;
  let fixture: ComponentFixture<CreateProfessionalExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProfessionalExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProfessionalExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
