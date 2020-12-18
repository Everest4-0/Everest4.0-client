import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoryBudgetComponent } from './list-category-budget.component';

describe('ListCategoryBudgetComponent', () => {
  let component: ListCategoryBudgetComponent;
  let fixture: ComponentFixture<ListCategoryBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCategoryBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCategoryBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
