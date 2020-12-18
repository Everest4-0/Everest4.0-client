import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoryBudgetComponent } from './create-category-budget.component';

describe('CreateCategoryBudgetComponent', () => {
  let component: CreateCategoryBudgetComponent;
  let fixture: ComponentFixture<CreateCategoryBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCategoryBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCategoryBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
