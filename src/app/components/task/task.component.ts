import { ScheduleComponent } from '../schedule/schedule.component';
import { TodoService } from '../../services/todo.service';
import { FormBuilder } from '@angular/forms';
import { ModalService } from '../modal/modal.service';
import { ToastService } from 'ng-uikit-pro-standard';
import { AuthService } from '../../services/auth.service';
import { ToDoForm } from '../../forms/todo.form';
import { ToDo } from '../../models/goal/todo';
import { Task } from '../../models/goal/task';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  //directives: [ScheduleComponent]
})
export class TaskComponent implements OnInit {

  @ViewChild(ScheduleComponent) child: ScheduleComponent;
  @Input() filters = [];
  @Input() showControls = true;
  public tasks: any = { overDue: [], thisWeek: [], all: [] }
  public taskDetails: Task = new Task()
  public todo: ToDo = new ToDo()
  form = new ToDoForm(this.fb)
  isCalendar: boolean = false;
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

    this.todo.endDate = new Date(this.todo.startDate + 'T' + this.todo.endTime + ':00')
    this.todo.startDate = new Date(this.todo.startDate + 'T' + this.todo.startTime + ':00')
    this.todo.user = this.auth.user
    this.toDoService.create(this.todo).subscribe(toDo => {
      this.toast.success('Evento registado com Sucesso', 'Sucesso')
      if (moment(0, "HH").diff(toDo.startDate, "days") === 0) { this.child.todos.push(toDo) }
      this.todo = new ToDo()
      this.modalService.close('todo-modal')
    })
  }

}
