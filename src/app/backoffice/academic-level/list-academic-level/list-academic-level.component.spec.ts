import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAcademicLevelComponent } from './list-academic-level.component';

describe('ListAcademicLevelComponent', () => {
  let component: ListAcademicLevelComponent;
  let fixture: ComponentFixture<ListAcademicLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAcademicLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAcademicLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
