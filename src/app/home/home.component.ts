import { NewsService } from './../services/news.service';
import { ModalService } from 'app/components/modal';
import { Goal } from './../models/goal/goal';
import { Task } from './../models/goal/task';
import { ToastService } from 'ng-uikit-pro-standard';
import { TaskService } from './../services/task.service';
import { state } from '@angular/animations';
import { AuthService } from './../services/auth.service';
import { GoalService } from './../services/goal.service';
import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { Enums, State } from 'app/models/enums';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
  public emailChartDataSeries: Array<number> = []
  public tasks: any = { overDue: [], thisWeek: [], all: [] }
  bingNews:any
  news: Array<any> = []


  constructor(
    private goalService: GoalService,
    public auth: AuthService,
    private taskService: TaskService,
    private toast: ToastService,
    private modalService: ModalService,
    private newsService: NewsService
  ) { }

  ngOnInit() {
    let lSunday, nSunday, oSunday, now;
    lSunday = oSunday = now = new Date((new Date()).setHours(0, 0, 0, 0));
    nSunday = new Date((new Date()).setHours(0, 0, 0, 0));
    lSunday.setDate(lSunday.getDate() - (lSunday.getDay() || 7) + 7);
    nSunday.setDate(nSunday.getDate() - (nSunday.getDay() || 7) + 14);
    let sAnt, sAct, eAtr, dashBoard;

    this.newsService.all({}).subscribe(news => {this.bingNews=news;this.news = news.value.filter(x=>x.image!==undefined)})

    this.goalService.all({ userId: this.auth.user.id }).subscribe(goals => {

      this.tasks.all = goals.map(goal => goal.tasks)
      this.tasks.all = this.tasks.all.reduce((x, y) => x.concat(y), [])
      this.tasks.overDue = this.tasks.all.filter(task => new Date(task.dueDate) < now && parseInt(task.state) < 3)
      this.tasks.thisWeek = this.tasks.all.filter(task => new Date(task.dueDate) > lSunday && new Date(task.dueDate) < nSunday && parseInt(task.state) < 3)
      eAtr = this.tasks.all.filter(task => new Date(task.dueDate) > now)
      sAct = this.tasks.all.filter(task => new Date(task.createdAt) > lSunday)
      sAnt = this.tasks.all.filter(task => new Date(task.createdAt) < lSunday)

    })



    this.emailChartType = ChartType.Pie;
    this.emailChartData = {
      series: this.emailChartDataSeries
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

    this.hoursChartType = ChartType.Line;
    this.hoursChartData = {
      //labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
      series: [
        [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
        [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
        [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
      ]
    };
    this.hoursChartOptions = {
      low: 0,
      high: 800,
      showArea: true,
      height: '245px',
      axisX: {
        showGrid: false,
      },
      lineSmooth: Chartist.Interpolation.simple({
        divisor: 3
      }),
      showLine: false,
      showPoint: false,
    };
    this.hoursChartResponsive = [
      ['screen and (max-width: 640px)', {
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    this.hoursChartLegendItems = [
      { title: 'Open', imageClass: 'fa fa-circle text-info' },
      { title: 'Click', imageClass: 'fa fa-circle text-danger' },
      { title: 'Click Second Time', imageClass: 'fa fa-circle text-warning' }
    ];

    this.activityChartType = ChartType.Bar;
    this.activityChartData = {
      labels: ['Por iniciar', 'Em curso', 'Concluido'],
      series: [
        [5, 3, 4],
        [3, 5, 2],
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
  getThumbnails(item: any) {
    try {
      return item.image.thumbnail.contentUrl
    } catch (e) {
      return '';
    }
  }
  getEmailChartDataSeries() {

    let now = new Date((new Date()).setHours(0, 0, 0, 0))
    let done = this.tasks.all.filter(task => new Date(task.dueDate) > now).filter(task => task.state == '3').length,
      toDo = this.tasks.all.filter(task => new Date(task.dueDate) > now).filter(task => task.state == '1').length

    let f = {
      series: [
        done / (done + toDo) * 100,
        toDo / (done + toDo) * 100

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
            timeOut: 300000,
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
