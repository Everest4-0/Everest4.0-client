import { Goal } from './../../models/goal/goal';

import { TodoService } from '../../services/todo.service';
import { FormBuilder } from '@angular/forms';
import { ModalService } from 'app/components/modal';
import { ToastService } from 'ng-uikit-pro-standard';
import { TaskService } from '../../services/task.service';
import { AuthService } from 'app/services/auth.service';
import { GoalService } from '../../services/goal.service';
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Task } from 'app/models/goal/task';
import { ToDoForm } from 'app/forms/todo.form';
import { ToDo } from 'app/models/goal/todo';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {


  @Input() filters=[]
  public thisWeekLimit = 5;
  public overDueLimit = 5;
  public tasks: any = { overDue: [], thisWeek: [], all: [] }
  public taskDetails: Task = new Task()
  public todos: Array<ToDo> = []
  form = new ToDoForm(this.fb)
  now: Date = new Date();
  constructor(
    private goalService: GoalService,
    public auth: AuthService,
    private taskService: TaskService,
    private toast: ToastService,
    private modalService: ModalService,
    private fb: FormBuilder,
    private toDoService: TodoService
  ) { }

  ngOnInit() {

    let lSunday, nSunday, oSunday, now;
    lSunday = oSunday = now = new Date((new Date()).setHours(0, 0, 0, 0));
    nSunday = new Date((new Date()).setHours(0, 0, 0, 0));
    lSunday.setDate(lSunday.getDate() - (lSunday.getDay() || 7) + 0);
    nSunday.setDate(nSunday.getDate() - (nSunday.getDay() || 7) + 7);
    let sAnt, sAct, eAtr, dashBoard;
    this.goalService.all({ userId: this.auth.user.id }).subscribe(goals => {
      goals.forEach(goal => goal.tasks.forEach(t => t.goal = goal))
      this.tasks.all = goals.map(goal => goal.tasks)
      this.tasks.all = this.tasks.all.sort((x, y) => x.createdAt > y.createdAt ? 1 : -1).reduce((x, y) => x.concat(y), [])
      this.tasks.overDue = this.tasks.all.filter(task => new Date(task.dueDate) < now && parseInt(task.state) < 3)
      this.tasks.thisWeek = this.tasks.all.filter(task => new Date(task.dueDate) > lSunday && new Date(task.dueDate) < nSunday && parseInt(task.state) < 3)
      eAtr = this.tasks.all.filter(task => new Date(task.dueDate) > now)
      sAct = this.tasks.all.filter(task => new Date(task.createdAt) > lSunday)
      sAnt = this.tasks.all.filter(task => new Date(task.createdAt) < lSunday)

    })

    this.toDoService.all({ userId: this.auth.user.id }).subscribe(todos => {

      this.todos = todos
        .filter(toDo => moment().format('YYYY-MM-DD') === moment(toDo.startDate).format('YYYY-MM-DD'))
        .sort((x, y) => x.startDate > y.startDate ? 1 : -1)
    })


  }

  updateState(task, state, list) {
    
    task.state = state
    task.goal = null
    this.taskService.update(task).subscribe(task => {
      this.tasks[list].forEach((t, i) => {
        if (t.id === task.id) {
          this.tasks[list].splice(i, 1);
          this.toast.success('Auto avaliação sobre ', 'Sucesso', {
            timeOut: 50000,
            progressBar: true,
          })
        }
      });
    })
  }
  updateToDoState(todo: ToDo) {

    todo.done = !todo.done
    this.toDoService.update(todo).subscribe(todo => {
      this.todos.forEach((t, i) => {
        if (t.id === todo.id) {
          todo = todo
          this.toast.success('Actividade Marcado como ' + (todo.done ? '' : 'não ') + 'executado  com sucesso ', 'Sucesso', {
            timeOut: 50000,
            progressBar: true,
          })
        }
      });
    })
  }

  anualGoal(goal: Goal) {
    return goal.partials.reduce((x: number, y) => { return x + parseFloat((y.value || 0) + '') }, 0)
  };
  showTaskDetails(task) {
    this.taskDetails = task
    this.openModal('task-detail-modal')
  }
  //['Pendente','Por inicial','Em curso','Concluido']
  states(s) {

    switch (parseInt(s)) {
      case 0:
        return [2, 3, 4]
      case 1:
        return [2, 3, 4]
      case 2:
        return [0, 3, 4]

    }
    return []
  }

  inTime(t) {
    return new Date(t) > new Date()
  }
  openModal(id) {
    this.modalService.open(id);
  }
  closeModal(id) {
    this.modalService.close(id);
  }
}