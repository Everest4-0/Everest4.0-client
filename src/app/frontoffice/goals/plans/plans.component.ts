import Swal from 'sweetalert2';
import { TaskService } from './../../../services/task.service';
import { TaskForm } from './../../../forms/task.form';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Task } from './../../../models/goal/task';
import { AuthService } from './../../../services/auth.service';
import { Goal } from './../../../models/goal/goal';
import { GoalService } from './../../../services/goal.service';
import { ModalService } from './../../../components/modal/modal.service';
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {

  task: Task = new Task();
  taskDetails: Task = new Task();
  form = new TaskForm(this.fb)
  tasks: Array<Task> = [];
  goals: Array<Goal> = []
  now: Date = new Date()

  statesArr = ['Pendente', 'Por inicial', 'Em curso', 'Concluido', 'Cancelado'];
  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private goalService: GoalService,
    private taskService: TaskService,
    private toast: ToastService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.task = new Task();

    this.goalService.all({ userId: this.auth.user.id }).subscribe(goals => {
      this.goals = goals
    })
  }

  showTaskDetails(task) {
    this.taskDetails = task
    this.openModal('task-detail-modal')
  }

  states(s) {
    switch (parseInt(s)) {
      case 0:
        return [2, 3, 4]
        break;
      case 1:
        return [2, 3, 4]
        break;
      case 2:
        return [0, 3, 4]
    }
    return []
  }
  setEstate(s) {
    this.task.state = s
  }
  inTime(t) {
    return new Date(t) > new Date()
  }
  addTask(g) {
    debugger
    this.task.goal = g
    this.openModal('plan-modal');
  }
  updateState(task: Task, state: number) {
    debugger
    task.state = state
    this.updateTask(task)
  }
  updateTask(task: Task) {

    this.taskService.update(task).subscribe(task => {

      let y = this.goals;
      y = y.filter(g => g.id = this.task.goal.id)[0]
      y = y.tasks
      y = y.filter(t => t.id = this.task.id)
      y = y[0]
      y = this.task

      this.toast.success('Tarefa foi actualizada com sucesso', 'Sucesso', {
        timeOut: 50000,
        progressBar: true,
      })
      this.modalService.close('plan-modal')
    })
  }
  saveTask() {
    if (this.form.dirty && this.form.valid) {
      const dueDate = this.task.dueDate

      this.task.dueDate = new Date(dueDate)

      this.taskService.create(this.task).subscribe(task => {
        this.goals.filter(goal => goal.id = this.task.goal.id)[0].tasks.push(this.task)
        this.task = new Task()
        task.goal = this.task.goal
        this.toast.success('Tarefa registada com sucesso', 'Sucesso', {
          timeOut: 50000,
          progressBar: true,
        })

        this.modalService.close('plan-modal')
      })

    } else {
      this.validateAllFormFields(this.form);
    }
  }
  anualGoal(goal: Goal) {
    return goal.partials.reduce((x: number, y) => { return x + parseFloat((y.value || 0) + '') }, 0)
  };
  openModal(id) {
    this.modalService.open(id);
  }
  closeModal(id) {
    this.modalService.close(id);
  }

  get controls() {
    return this.form.controls;
  }
  /**
   * refine
   */
  validateAllFormFields(formGroup: FormGroup) {

    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
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
