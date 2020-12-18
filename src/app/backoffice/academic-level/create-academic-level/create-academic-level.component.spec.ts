import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAcademicLevelComponent } from './create-academic-level.component';

describe('CreateAcademicLevelComponent', () => {
  let component: CreateAcademicLevelComponent;
  let fixture: ComponentFixture<CreateAcademicLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAcademicLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAcademicLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
