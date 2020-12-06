import Swal from 'sweetalert2';
import { TaskService } from './../../../services/task.service';
import { TaskForm } from './../../../forms/task.form';
import { FormBuilder } from '@angular/forms';
import { Task } from './../../../models/goal/task';
import { AuthService } from './../../../services/auth.service';
import { Goal } from './../../../models/goal/goal';
import { GoalService } from './../../../services/goal.service';
import { ModalService } from './../../../components/modal/modal.service';
import { Component, OnInit } from '@angular/core';

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
  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private goalService: GoalService,
    private taskService: TaskService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.task = new Task();

    this.goalService.all({ userId: this.auth.user.id }).subscribe(goals => {
      this.goals = goals
      goals.forEach(x => {
        x.tasks.forEach(t => {
          x.tasks = null
          t.goal = x
          this.tasks.push(t)
        })

      })
    })
  }

  showTaskDetails(task) {
    this.taskDetails = task
    this.openModal('task-detail-modal')
  }
  //['Pendente','Por inicial','Em curso','Concluido']
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
  inTime(t){
    return new Date(t) > new Date()
  }
  addTask(g) {
    
    this.task.goal = g
    this.openModal('plan-modal');
  }
  updateState(task, state) {
    task.state = state
    this.taskService.update(task).subscribe(task => {
      this.tasks.forEach(t => {
        if (t.id === task.id)
          t = task
      });
      Swal.fire(
        'Sucesso!',
        'Resultados esperado registado com sucesso',
        'success'
      )
      this.modalService.close('plan-modal')
    })
  }
  saveTask() {
    let dueDate = this.task.dueDate
    this.task.dueDate = new Date(dueDate)
    this.taskService.create(this.task).subscribe(task => {
      this.task = new Task()
      this.tasks.push(task)
      Swal.fire(
        'Sucesso!',
        'Resultados esperado registado com sucesso',
        'success'
      )
      this.modalService.close('plan-modal')
    })
  }
  anualGoal(goal: Goal) {
    return goal.partials.reduce((x: number, y) => { return x + parseFloat((y.value || 0)+'') }, 0)
  };
  openModal(id) {
    this.modalService.open(id);
  }
  closeModal(id) {
    this.modalService.close(id);
  }
}
