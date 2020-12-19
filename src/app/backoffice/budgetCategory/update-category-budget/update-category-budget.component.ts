import { ToastService } from 'ng-uikit-pro-standard';
import { BudgetCategoryForm } from './../../forms/budgetCategory.form';
import { FormBuilder } from '@angular/forms';
import { BudgetCategoryService } from './../../../services/goals/budget-category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BudgetCategory } from 'app/models/goal/budget-category';

@Component({
  selector: 'app-update-category-budget',
  templateUrl: './update-category-budget.component.html',
  styleUrls: ['./update-category-budget.component.css']
})
export class UpdateCategoryBudgetComponent implements OnInit {


  public form = new BudgetCategoryForm(this.fb)
  
  public budgetCategory: BudgetCategory= new BudgetCategory()

  constructor(private route:ActivatedRoute,
              private budgetCategoryService: BudgetCategoryService,
              private fb: FormBuilder,
              private router: Router,
              private toast: ToastService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']
    this.budgetCategoryService.one(id).subscribe(data=>this.budgetCategory=data)
  }

  saveForm(t={}) {
    console.log(this.budgetCategory)
    this.budgetCategoryService.update(this.budgetCategory).subscribe(evaluation => {
      this.toast.success('Categoria actualizado com successo', 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
      })
      this.router.navigate(['/backoffice/budget-categories']);
    })
  }

}
