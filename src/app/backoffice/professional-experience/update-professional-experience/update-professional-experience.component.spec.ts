import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfessionalExperienceComponent } from './update-professional-experience.component';

describe('UpdateProfessionalExperienceComponent', () => {
  let component: UpdateProfessionalExperienceComponent;
  let fixture: ComponentFixture<UpdateProfessionalExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProfessionalExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfessionalExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
