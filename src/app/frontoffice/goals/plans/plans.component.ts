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
  form = new TaskForm()
  tasks: Array<Task> = [];
  goals: Array<Goal> = []
  now: Date = new Date()

  statesArr = ['Pendente', 'Por inicial', 'Em curso', 'Concluido', 'Cancelado'];
  constructor(
    private modalService: ModalService,
    private goalService: GoalService,
    private taskService: TaskService,
    private toast: ToastService,
    private auth: AuthService) { }

  ngOnInit(): void {

    this.goalService.all({ userId: this.auth.user.id }).subscribe(goals => {
      this.goals = goals
    })
  }

  showTask(task: Task, goal: Goal) {
    debugger
    this.task = task
    this.task.goal = goal

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
  addTask(g: Goal) {
    this.task.goal = g
    this.openModal('plan-modal');
  }

  onEdit() {

    this.openModal('plan-modal')
    this.modalService.close('task-detail-modal')
  }

  updateState(task: Task, state: number) {
    task.state = state
    this.task = task;
    this.updateTask()
  }
  updateTask() {

    this.taskService.update(this.task)
      .subscribe(task => {

        this.task = task
        this.tasks.filter(t => t.id === task.id)[0] = task;

        this.goals.filter(goal => goal.id = this.task.goal.id)[0]
          .tasks.filter(t => t.id === task.id)[0] = task;

        this.toast.success('Tarefa actualizada com sucesso', 'Sucesso', {
          timeOut: 5000,
          progressBar: true,
        })
        this.task = task
        this.modalService.close('plan-modal')
      })
  }

  createTask() {

    this.taskService.create(this.task)
      .subscribe(task => {
        this.tasks.push(task)

        this.goals.filter(goal => goal.id = this.task.goal.id)[0].tasks.push(task)

        this.toast.success('Tarefa registada com sucesso', 'Sucesso', {
          timeOut: 5000,
          progressBar: true,
        })
        this.task = new Task()
        this.modalService.close('plan-modal')
      })
  }


  saveTask() {
    if (this.form.fg.dirty && this.form.fg.valid) {

      this.task.dueDate = new Date(this.task.dueDate);

      if (this.task.id) {
        this.updateTask()
      } else {
        this.createTask()
      }
    // tslint:disable-next-line: one-line
    }else {
      this.form.validateAllFormFields();
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

  accordion(that) {

    that.classList.toggle('pe-7s-angle-up');
    that.classList.toggle('pe-7s-angle-down');

    const panel = document.getElementById(that.getAttribute('title'))
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }


  }
}
