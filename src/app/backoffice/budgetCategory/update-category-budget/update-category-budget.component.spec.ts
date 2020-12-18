import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCategoryBudgetComponent } from './update-category-budget.component';

describe('UpdateCategoryBudgetComponent', () => {
  let component: UpdateCategoryBudgetComponent;
  let fixture: ComponentFixture<UpdateCategoryBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCategoryBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCategoryBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
