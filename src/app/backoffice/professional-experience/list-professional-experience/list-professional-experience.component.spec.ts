import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProfessionalExperienceComponent } from './list-professional-experience.component';

describe('ListProfessionalExperienceComponent', () => {
  let component: ListProfessionalExperienceComponent;
  let fixture: ComponentFixture<ListProfessionalExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProfessionalExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProfessionalExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
