import { Goal } from 'app/models/goal/goal';

import { TodoService } from 'app/services/todo.service';
import { FormBuilder } from '@angular/forms';
import { ModalService } from 'app/components/modal';
import { ToastService } from 'ng-uikit-pro-standard';
import { TaskService } from 'app/services/task.service';
import { AuthService } from 'app/services/auth.service';
import { GoalService } from 'app/services/goal.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { Task } from 'app/models/goal/task';
import { ToDoForm } from 'app/forms/todo.form';
import { ToDo } from 'app/models/goal/todo';

@Component({
  selector: 'app-shared-todo',
  templateUrl: './shared-todo.component.html',
  styleUrls: ['./shared-todo.component.scss']
})
export class SharedTodoComponent implements OnInit {



  @Input() filters = []
  @Output() updateList: EventEmitter<ToDo> = new EventEmitter<ToDo>()
  public thisWeekLimit = 5;
  public overDueLimit = 5;
  @Input() public tasks = [];
  public taskDetails: ToDo = new ToDo()
  public todos: Array<ToDo> = []
  form = new ToDoForm(this.fb)
  now: Date = new Date();


  public todo: ToDo = new ToDo()

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




  }

  updateToDoState(todo: ToDo) {

    todo.done = !todo.done
    this.toDoService.update(todo).subscribe(todo => {

      this.toast.success('Actividade Marcado como ' + (todo.done ? '' : 'não ') + 'executado  com sucesso ', 'Sucesso', {
        timeOut: 50000,
        progressBar: true,
      })
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
  openModal(id, toDo?: ToDo) {
    debugger
    if (toDo) {
      this.todo = toDo;
    }
    this.modalService.open(id);
  }
  closeModal(id) {
    this.modalService.close(id);
  }

  saveToDo() {
    if (this.todo.id) { return this.updateToDo(this.todo); }
    this.todo.endDate = new Date(this.todo.startDate + 'T' + this.todo.endTime + ':00')
    this.todo.startDate = new Date(this.todo.startDate + 'T' + this.todo.startTime + ':00')

    this.toDoService.create(this.todo).subscribe(toDo => {
      this.toast.success('Agenda registado com sucesso', 'Sucesso')
      debugger
      this.updateList.emit(toDo);
      this.modalService.close('todo-modal')
    })
  }

  updateToDo(todo) {

    this.todo.endDate = new Date(this.todo.startDate + 'T' + this.todo.endTime + ':00')
    this.todo.startDate = new Date(this.todo.startDate + 'T' + this.todo.startTime + ':00')

    this.toDoService.update(this.todo).subscribe(toDo => {
      this.toast.success('Agenda actualizado com sucesso', 'Sucesso')
      todo = toDo;
      this.modalService.close('todo-modal')
    })
  }
}
