import { ToastService } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';
import { BudgetCategoryService } from './../../../services/goals/budget-category.service';
import { FormBuilder } from '@angular/forms';
import { BudgetCategoryForm } from './../../forms/budgetCategory.form';
import { Component, OnInit } from '@angular/core';
import { BudgetCategory } from 'app/models/goal/budget-category';

@Component({
  selector: 'app-create-category-budget',
  templateUrl: './create-category-budget.component.html',
  styleUrls: ['./create-category-budget.component.css']
})
export class CreateCategoryBudgetComponent implements OnInit {

  public form = new BudgetCategoryForm(this.fb)

  public budgetCategory: BudgetCategory = new BudgetCategory();

  constructor(
    private fb: FormBuilder,
    private budgetCategoryService: BudgetCategoryService,
    private router: Router,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
  
  }

  saveForm() {
    console.log(this.budgetCategory);
    
    this.budgetCategoryService.create(this.budgetCategory).subscribe(data => {
      this.toast.success('Categoria de orçamento criado com successo', 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
      })
      
      this.router.navigate(['/backoffice/budget_categories']);
    })
  }

}
