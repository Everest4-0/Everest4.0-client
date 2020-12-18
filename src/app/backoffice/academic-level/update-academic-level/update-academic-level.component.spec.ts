import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAcademicLevelComponent } from './update-academic-level.component';

describe('UpdateAcademicLevelComponent', () => {
  let component: UpdateAcademicLevelComponent;
  let fixture: ComponentFixture<UpdateAcademicLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAcademicLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAcademicLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
