import { BudgetCategory } from './../../../models/goal/budget-category';
import { BudgetCategoryService } from './../../../services/goals/budget-category.service';
import { ToastService } from 'ng-uikit-pro-standard';
import Swal from 'sweetalert2';
import { BudgetService } from './../../../services/budget.service';
import { FormBuilder } from '@angular/forms';
import { BudgetForm } from './../../../forms/budget.form';
import { Budget } from './../../../models/goal/budget';
import { AuthService } from './../../../services/auth.service';
import { GoalService } from './../../../services/goal.service';
import { Task } from './../../../models/goal/task';
import { ModalService } from './../../../components/modal/modal.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss']
})
export class BudgetsComponent implements OnInit {


  revenue: Array<Task> = []
  expenses: Array<Task> = []
  budget: Budget = new Budget();
  budgetCategories: Array<BudgetCategory> = [];
  form = new BudgetForm(this.fb)
  public isTab = 1;
  public switchtabTo = (i) => this.isTab = i;
  constructor(
    private fb: FormBuilder,
    private goalService: GoalService,
    private budgetService: BudgetService,
    private authService: AuthService,
    private modalService: ModalService,
    private budgetCategoryService: BudgetCategoryService,
    private toast: ToastService) { }

  ngOnInit(): void {


    this.budgetCategoryService.all({}).subscribe(categories => this.budgetCategories = categories)

    this.goalService.all({ userId: this.authService.user.id }).subscribe(goals => {
      goals.forEach(goal => {
        goal.tasks.forEach(task => {
          if (task.revenue > 0) {
            this.revenue.push(task);
          }
          if (task.expenses > 0) {
            this.expenses.push(task);
          }
        })
      })
    })
  }

  saveBudget() {
    this.budgetService.create(this.budget).subscribe(budget => {
      debugger
      budget.task = this.budget.task;
      budget.category = this.budget.category
      this.budget = new Budget();
      if (budget.direction) {
        this.revenue.forEach(task => {
          if (task.id === budget.task.id)
            task.budgets.push(budget)
        })
      } else {
        this.expenses.forEach(task => {
          if (task.id === budget.task.id)
            task.budgets.push(budget)
        })
      }
      this.toast.success('Orçamento registado com sucesso', 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
      })
      
      this.closeModal('budget-modal')
    })
  }
  createBudget(task: Task, direction: boolean) {
    this.budget.task = task
    this.budget.direction = direction
    this.openModal('budget-modal')
  }
  openModal(id) {
    this.modalService.open(id);
  }

  closeModal(id) {
    this.modalService.close(id);
  }
  valueToFix(task: Task, direction: boolean = true) {
    let final = task.budgets.reduce((x: number, y) => x + parseFloat(y.value + ''), 0).toFixed(2)

    return final;
  }
  stateBudget(task: Task, direction: boolean) {
    let total = (direction ? task.revenue : task.expenses)
    let pago = parseFloat(this.valueToFix(task, direction) + '')
    let resto = total - pago
    //
    if (pago > total)
      return 0
    else if (pago > total - total * 10 / 100)
      return 1;
    else
      return 2
  }

  get getBudgetCategories() {
    return this.budgetCategories.filter(z => z.direction === this.budget.direction)
  }


  accordion(that) {

    that.classList.toggle("pe-7s-angle-up");
    that.classList.toggle("pe-7s-angle-down");

    var panel = document.getElementById(that.getAttribute('title'))
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }


  }
}
