import { Task } from '../../models/goal/task';

import { ModalService } from 'app/components/modal';
import { Goal } from '../../models/goal/goal';
import { ToastService } from 'ng-uikit-pro-standard';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { GoalService } from '../../services/goal.service';
import { Component, OnInit } from '@angular/core';
import { LegendItem, ChartType } from './../../components/lbd/lbd-chart/lbd-chart.component';
import * as moment from 'moment';
import { NgLocalization } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public quizSolved = false;
  public dataLoaded = false;
  public emailChartType: ChartType;
  public emailChartData: any;
  public chartOptions: any;
  public emailChartLegendItems: LegendItem[];

  public hoursChartType: ChartType;
  public hoursChartData: any;
  public hoursChartOptions: any;
  public hoursChartResponsive: any[];
  public hoursChartLegendItems: LegendItem[];

  public activityChartType: ChartType;
  public activityChartData: any;
  public activityChartOptions: any;
  public activityChartResponsive: any[];
  public activityChartLegendItems: LegendItem[];
  public activityChartDataSeries: Array<any>;
  public emailChartDataSeries = { series: ['0', '100'] }
  public tasks: any = { overDue: [], thisWeek: [], all: [] }

  public vacants = [
    {
      id: 1,
      company: 'Renailer',
      title: 'Contabilista Senior',
      place: 'Luanda, Angola',
      regim: 'Full time'
    }, {
      id: 2,
      company: 'Rosalis',
      title: 'Gestor de contas',
      place: 'Benguela, Angola',
      regim: 'Full time'
    }, {
      id: 3,
      company: 'Bona Kardin',
      title: 'Assitente Administrativo',
      place: 'Luanda, Angola',
      regim: 'Full time'
    }, {
      id: 4,
      company: 'Salgados e Doces',
      title: 'Chefe de cozinha',
      place: 'Cabinda, Angola',
      regim: 'Full time'
    }, {
      id: 5,
      company: 'Radio 96 FM',
      title: 'Tecnico de informatica',
      place: 'Luanda, Angola',
      regim: 'Part time'
    }, {
      id: 6,
      company: 'Paypel',
      title: 'Help desk',
      place: 'Remoto',
      regim: 'Part time'
    },
  ]
  constructor(
    private goalService: GoalService,
    public auth: AuthService,
    private taskService: TaskService,
    private toast: ToastService,
    private modalService: ModalService,
  ) { }

  ngOnInit() {

    let lSunday, nSunday, oSunday, now;
    lSunday = oSunday = now = new Date((new Date()).setHours(0, 0, 0, 0));
    nSunday = new Date((new Date()).setHours(0, 0, 0, 0));
    lSunday.setDate(lSunday.getDate() - (lSunday.getDay() || 7));
    nSunday.setDate(nSunday.getDate() - (nSunday.getDay() || 7) + 7);
    let sAnt, sAct, eAtr, dashBoard;

    this.taskService.all({ userId: this.auth.user.id }).subscribe(tasks => {

      this.tasks.all = tasks
      this.tasks.all = this.tasks.all.reduce((x, y) => x.concat(y), [])
      this.tasks.overDue = this.tasks.all.filter(task => new Date(task.dueDate) < now && parseInt(task.state) < 3)
      this.tasks.thisWeek = this.tasks.all.filter(task => new Date(task.dueDate) > lSunday && new Date(task.dueDate) < nSunday && parseInt(task.state) < 3)
      eAtr = this.tasks.all.filter(task => new Date(task.dueDate) < now)
      sAct = this.tasks.all.filter(task => new Date(task.dueDate) > lSunday)
      sAnt = this.tasks.all.filter(task => new Date(task.dueDate) < lSunday)

      const done = sAct.filter((x: Task) => x.state > 2).length
      const all = sAct.length;

      this.emailChartDataSeries = {
        series: [(100 * done / all).toFixed(2), (100 * (all - done) / all).toFixed(2)]
      }

      const fnToDo = (x: Array<Task>) => x.filter(r => r.state < 2).length;
      const fnDoing = (x: Array<Task>) => x.filter(r => r.state === 2).length;
      const fnDone = (x: Array<Task>) => x.filter(r => r.state > 2).length;
      this.activityChartData = {
        labels: ['Por iniciar', 'Em curso', 'Concluido'],
        series: [
          [fnToDo(sAnt), fnDoing(sAnt), fnDone(sAnt)],
          [fnToDo(sAct), fnDoing(sAct), fnDone(sAct)],
          [fnToDo(eAtr), fnDoing(eAtr), fnDone(eAtr)]
        ]
      };



      this.dataLoaded = true;
    })



    this.emailChartType = ChartType.Pie;
    this.emailChartData = {
      series: [2, 1]
    };
    this.chartOptions = {
      donut: true,
      donutWidth: 60,
      startAngle: 270,
      total: 200
    };
    this.emailChartLegendItems = [
      { title: 'Realizado', imageClass: 'fa fa-circle text-info' },
      { title: 'Por realizar', imageClass: 'fa fa-circle text-danger' }
    ];


    this.activityChartType = ChartType.Bar;
    this.activityChartData = {
      labels: ['Por iniciar', 'Em curso', 'Concluido'],
      series: [
        [5, 5, 5],
        [3, 3, 3],
        [2, 3, 1]
      ]
    };
    this.activityChartOptions = {
      seriesBarDistance: 20,
      axisX: {
        showGrid: false
      },
      height: '245px'
    };
    this.activityChartResponsive = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 20,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    this.activityChartLegendItems = [
      { title: 'Semana anterior', imageClass: 'fa fa-circle text-info' },
      { title: 'Semana Actual', imageClass: 'fa fa-circle text-danger' },
      { title: 'Em atraso', imageClass: 'fa fa-circle text-warning' }
    ];



  }



  getEmailChartDataSeries() {

    const now = moment()
    const done = this.tasks.all.filter(task => moment(task.dueDate) > now).filter(task => parseInt(task.state) > 2).length,
      toDo = this.tasks.all.filter(task => moment(task.dueDate) < now).filter(task => parseInt(task.state) < 3).length

    const f = {
      series: [
        (done / (done + toDo) * 100).toFixed(2),
        (toDo / (done + toDo) * 100).toFixed(2)

      ]
    }

    return f;
  }

  updateState(task, state, list) {


    task.state = state
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

  showTaskDetails(task) {
    /*this.taskDetails = task
    this.openModal('task-detail-modal')*/
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

  anualGoal(goal: Goal) {
    return goal.partials.reduce((x: number, y) => { return x + parseFloat((y.value || 0) + '') }, 0)
  };
  openModal(id) {
    this.modalService.open(id);
  }
  closeModal(id) {
    this.modalService.close(id);
  }
}
