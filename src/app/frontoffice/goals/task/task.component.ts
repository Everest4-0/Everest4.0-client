import { TodoService } from './../../../services/todo.service';
import { FormBuilder } from '@angular/forms';
import { ModalService } from './../../../components/modal/modal.service';
import { ToastService } from 'ng-uikit-pro-standard';
import { AuthService } from './../../../services/auth.service';
import { ToDoForm } from './../../../forms/todo.form';
import { ToDo } from './../../../models/goal/todo';
import { Task } from './../../../models/goal/task';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleComponent } from '../schedule/schedule.component';
import * as moment from 'moment';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  //directives: [ScheduleComponent]
})
export class TaskComponent implements OnInit {

  @ViewChild(ScheduleComponent) child: ScheduleComponent;
  public tasks: any = { overDue: [], thisWeek: [], all: [] }
  public taskDetails: Task = new Task()
  public todo: ToDo = new ToDo()
  form = new ToDoForm(this.fb)
  isCalendar: false;
  dpConfig = {
    mode: 'daytime'
  }
  constructor(
    public auth: AuthService,
    private toast: ToastService,
    public modalService: ModalService,
    private fb: FormBuilder,
    private toDoService: TodoService
  ) { }
  ngOnInit(): void { }

  saveToDo() {

    this.todo.date = new Date(this.todo.date + 'T' + this.todo.time + ':00')
    this.todo.user = this.auth.user
    this.toDoService.create(this.todo).subscribe(toDo => {
      this.toast.success('Evento registado com Sucesso', 'Sucesso')
      if (moment(0, "HH").diff(toDo.date, "days") === 0) { this.child.todos.push(toDo) }
      this.todo = new ToDo()
      this.modalService.close('todo-modal')
    })
  }

}
