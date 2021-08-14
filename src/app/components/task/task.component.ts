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
import { TaskForm } from 'app/forms/task.form';
import { TaskService } from 'app/services/task.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {

  @ViewChild(ScheduleComponent) child: ScheduleComponent;
  @Input() filters = [];
  @Input() outToDos = [];
  @Input() showControls = true;

  public tasks: any = { overDue: [], thisWeek: [], all: [] }
  public taskDetails: Task = new Task()
  public todo: ToDo = new ToDo()

  miniForm: true;
  form = new TaskForm()
  task: Task = new Task();
  isCalendar = false;
  dpConfig = {
    mode: 'daytime'
  }
  constructor(
    public auth: AuthService,
    private toast: ToastService,
    private taskService: TaskService,
    public modalService: ModalService,
    private toDoService: TodoService
  ) { }
  ngOnInit(): void { }

  saveToDo() {

    this.todo.endDate = new Date(this.todo.startDate + 'T' + this.todo.endTime + ':00')
    this.todo.startDate = new Date(this.todo.startDate + 'T' + this.todo.startTime + ':00')
    this.todo.user = this.auth.user
    this.toDoService.create(this.todo).subscribe(toDo => {
      this.toast.success('Evento registado com Sucesso', 'Sucesso')
      // if (moment(0, "HH").diff(toDo.startDate, "days") === 0) { this.child.todos.push(toDo) }
      this.todo = new ToDo()
      this.modalService.close('todo-modal')
    })
  }

  saveTask() {

    if (this.form.fg.dirty && this.form.fg.valid) {
      const dueDate = this.task.dueDate

      this.task.dueDate = new Date(dueDate)

      this.taskService.create(this.task).subscribe(task => {
       //  this.goals.filter(goal => goal.id = this.task.goal.id)[0].tasks.push(this.task)
        this.task = new Task()

        this.toast.success('Tarefa registada com sucesso', 'Sucesso', {
          timeOut: 50000,
          progressBar: true,
        })

        this.modalService.close('plan-modal')
      })

    } else {
      this.form.validateAllFormFields();
    }
  }
}
