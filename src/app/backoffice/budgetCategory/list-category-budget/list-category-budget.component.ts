import { BudgetCategoryService } from './../../../services/goals/budget-category.service';
import { BudgetCategory } from './../../../models/goal/budget-category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-category-budget',
  templateUrl: './list-category-budget.component.html',
  styleUrls: ['./list-category-budget.component.css']
})
export class ListCategoryBudgetComponent implements OnInit {

  public budgetCategories: Array<BudgetCategory> = []
  constructor(private budgetCategoryService:BudgetCategoryService) { }



  ngOnInit(): void {
    this.budgetCategoryService.all({}).subscribe(datas => this.budgetCategories = datas);
  }

}
