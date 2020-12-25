import { ToastService } from 'ng-uikit-pro-standard';
import Swal from 'sweetalert2';
import { EvaluationRequestService } from './../../services/evaluation-request.service';
import { ValidationService } from './../../services/validators/validation.service';
import { EvaluationRequestForm } from './../../forms/evaluation-request.form';
import { FormBuilder } from '@angular/forms';
import { EvaluationRequest } from '../../models/diagnostic/evaluation-request';
import { ChartType, LegendItem } from './../../lbd/lbd-chart/lbd-chart.component';

import { AuthService } from './../../services/auth.service';
import { UserEvaluationService } from './../../services/user-evaluation.service';
import { EvaluationService } from './../../services/evaluation.service';
import { ModalService } from './../../components/modal/modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback-evaluation',
  templateUrl: './feedback-evaluation.component.html',
  styleUrls: ['./feedback-evaluation.component.scss']
})
export class FeedbackEvaluationComponent implements OnInit {


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
  public activityChartData: Array<any> = [];
  public activityChartOptions: any;
  public activityChartResponsive: any[];
  public activityChartLegendItems: LegendItem[];


  public currentRequest;
  public evaluations: Array<any> = [];
  public userEvaluations: Array<any> = []
  public evaluationRequest: EvaluationRequest = new EvaluationRequest();
  public evaluationRequestform;
  public requests: Array<any> = [];
  public activeRelation: Array<any>;
  public users = []

  public relationLabel = ['Familiar', 'Colega de trabalho', 'Amigo'];
  constructor(
    
    private fb: FormBuilder,
    private modalService: ModalService,
    private evaluationService: EvaluationService,
    private evaluationRequestService: EvaluationRequestService,
    private userEvaluationService: UserEvaluationService,
    public auth: AuthService,
    private toast: ToastService) {
  }


  ngOnInit() {
    this.evaluationRequest.requester = this.auth.user;
    this.evaluationRequestform = new EvaluationRequestForm(this.fb)

    this.activityChartType = ChartType.Bar;
    this.activityChartOptions = {
      seriesBarDistance: 10,
      reverseData: true,
      horizontalBars: true,
      high: 4,
      onlyInteger: true,
      divisor: 1,
      scaleMinSpace: 1,
      scaleMaxSpace: 1,
      low: 0,
      axisY: {
        offset: 70,
        interval: 1,
      },
      axisX: {
        title: "Axis X with interval 50",
        interval: 1
      },
      height: '145px'
    };
    this.activityChartResponsive = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 20,
        axisY: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    this.activityChartLegendItems = [
      { title: 'Familiar', imageClass: 'fa fa-circle text-violet' },
      { title: 'Colega de trabalho', imageClass: 'fa fa-circle text-warning' },
      { title: 'Amigo', imageClass: 'fa fa-circle text-danger' },
      { title: 'Eu', imageClass: 'fa fa-circle text-info' }
    ];

    this.userEvaluationService.all({ userId: this.auth.user.id }).subscribe(evaluations => {
      this.evaluationService.all().subscribe(evaluations => {
        evaluations.forEach(e => {
          e.points = this.evaluationPoints(e.id);
        })

        this.evaluations = this.groupBy(evaluations, 'group')
      })

      this.evaluationRequestService.all({ requesterId: this.auth.user.id }).subscribe(requests => {
        this.requests = requests

        this.setActiveRelation()
      })

      this.userEvaluations = evaluations
    })
  }
  filterValues(input) {
    let filter = this.evaluationRequest.requested.email;
    if (filter.length > 3)
      this.auth.all({ $filter: filter }).subscribe(users => {
        
        this.users = users//.filter(x=>x.id!==this.auth.user.id)
        if (ValidationService.emailValidator({ value: filter }) == null) {
          this.users.push({ firstName: filter, email: filter })
        }
      })

  }
  getActivityChartData(section) {
    let arr = [];

    this.activityChartData = this.evaluations.filter(x => x[0] === section)[0][1]

    let calculatePoints = (i: number): number => {
      let g = this.userEvaluations.filter(x => x.evaluation.group == section && x.request != undefined && x.request.relationId === i)
      if (g.length === 0) return 0;
      let p = g.reduce((t: number, v) => { return t + (parseInt(v.points)) }, 0) / 3
      let f = p.toFixed(2)
      return parseFloat(f)
    }

    for (let i = 1; i < 4; i++)
      arr.push([calculatePoints(i)])
    let g = this.userEvaluations.filter(x => x.evaluation.group == section && x.request == undefined)
    let y = '0';
    if (g.length > 0) {
      y = (g.reduce((t: number, v) => { return t + (parseInt(v.points)) }, 0) / 3).toFixed(2)
    }

    arr.push([parseFloat(y)])

    return { series: arr }
  }

  evaluationPoints(id: string): number {
    let total = this.userEvaluations.filter(e => e.evaluation.id == id).reduce((t, m) => { return t + m.points }, 0);

    return total > 4 ? 4 : total;
  }
  groupBy(xs, key) {

    let final = xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});


    return Object.keys(final).map((k) => [k, final[k]]);
  }

  selectRequested(item) {
    this.evaluationRequest.requested = item
    this.users = [];
  }

  setActiveRelation() {
    var t = [1, 2, 3].filter(y => !this.requests.map(x => parseInt(x.relationId)).includes(y))
    this.activeRelation = t;
  }
  askEvaluation() {
    this.evaluationRequestService.create(this.evaluationRequest).subscribe(request => {
      
      this.requests.push(request)
      this.setActiveRelation()
      if (request.id) {
        this.toast.success('Solicitação de Feedback ao seu ' +
          this.evaluationRequest.relation + ' '
          + this.evaluationRequest.requested.datas.fullName
          + ' foi efectuado com suecceso', 'Sucesso', {
          timeOut: 50000,
          progressBar: true,
        })
        this.evaluationRequest = new EvaluationRequest();
        this.evaluationRequest.requester = this.auth.user;
        this.closeModal('ask-evaluation-modal')
      }
    })
  }

  getUserAvatar(s) {
    return s.split('ttps://').length > 1 ? s :this.auth.serverAddress + s
  }
  openModal(id: string) {
    this.modalService.open(id);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
}
