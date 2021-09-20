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
  ngOnInit(): void {
    this.task.duration = this.task.revenue = this.task.expenses = 0;
  }


  saveTask() {

    if (this.form.fg.dirty) {
      const dueDate = this.task.dueDate
      const startDate = new Date(dueDate + 'T' + this.todo.startTime);
      const endDate = new Date(dueDate + 'T' + this.todo.endTime);
      const diffMs = endDate.getTime() - startDate.getTime();
      this.task.duration = Math.round(((diffMs % 86400000) % 3600000) / 60000);
      this.task.dueDate = new Date(dueDate)

      this.taskService.create(this.task).subscribe(task => {
        //  this.goals.filter(goal => goal.id = this.task.goal.id)[0].tasks.push(this.task)
        this.task = new Task()
        this.todo = new ToDo()
        this.modalService.close('todo-modal')
        this.toast.success('Registo efectuado com sucesso', 'Sucesso', {
          timeOut: 50000,
          progressBar: true,
        })

        this.modalService.close('plan-modal')
      })

    } else {
      this.form.validateAllFormFields();
    }
  }

  setValue($event, field) {
    this.todo[field] = $event.target.value;
  }
}
