import { Goal } from './../../../models/goal/goal';
import { ModalService } from 'app/components/modal';
import { ToastService } from 'ng-uikit-pro-standard';
import { TaskService } from './../../../services/task.service';
import { AuthService } from 'app/services/auth.service';
import { GoalService } from './../../../services/goal.service';
import { Task } from './../../../models/goal/task';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  
  public tasks: any = { overDue: [], thisWeek: [], all: [] }
  public taskDetails: Task = new Task()
 
  constructor(
    private goalService: GoalService,
    public auth: AuthService,
    private taskService: TaskService,
    private toast: ToastService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    let lSunday, nSunday, oSunday, now;
    lSunday = oSunday = now = new Date((new Date()).setHours(0, 0, 0, 0));
    nSunday = new Date((new Date()).setHours(0, 0, 0, 0));
    lSunday.setDate(lSunday.getDate() - (lSunday.getDay() || 7) + 7);
    nSunday.setDate(nSunday.getDate() - (nSunday.getDay() || 7) + 14);
    let sAnt, sAct, eAtr, dashBoard;
    this.goalService.all({ userId: this.auth.user.id }).subscribe(goals => {

      this.tasks.all = goals.map(goal => goal.tasks)
      this.tasks.all = this.tasks.all.reduce((x, y) => x.concat(y), [])
      this.tasks.overDue = this.tasks.all.filter(task => new Date(task.dueDate) < now && parseInt(task.state) < 3)
      this.tasks.thisWeek = this.tasks.all.filter(task => new Date(task.dueDate) > lSunday && new Date(task.dueDate) < nSunday && parseInt(task.state) < 3)
      eAtr = this.tasks.all.filter(task => new Date(task.dueDate) > now)
      sAct = this.tasks.all.filter(task => new Date(task.createdAt) > lSunday)
      sAnt = this.tasks.all.filter(task => new Date(task.createdAt) < lSunday)

    })


  }

  updateState(task, state, list) {

    
    task.state = state
    this.taskService.update(task).subscribe(task => {
      this.tasks[list].forEach((t, i) => {
        if (t.id === task.id) {
          this.tasks[list].splice(i, 1);
          this.toast.success('Auto avaliação sobre ', 'Sucesso', {
            timeOut: 300000,
            progressBar: true,
          })
        }
      });
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
      case 1:
        return [2, 3, 4]
      case 2:
        return [0, 3, 4]

    }
    return []
  }

  inTime(t){
    return new Date(t) > new Date()
  }

  openModal(id) {
    this.modalService.open(id);
  }
  closeModal(id) {
    this.modalService.close(id);
  }
}