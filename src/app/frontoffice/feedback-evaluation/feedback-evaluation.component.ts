import Swal from 'sweetalert2';
import { EvaluationRequestService } from './../../services/evaluation-request.service';
import { ValidationService } from './../../services/validators/validation.service';
import { EvaluationRequestForm } from './../../forms/evaluation-request.form';
import { FormBuilder } from '@angular/forms';
import { EvaluationRequest } from './../../models/evaluation-request';
import { ChartType, LegendItem } from './../../lbd/lbd-chart/lbd-chart.component';
import { Evaluation } from './../../models/evaluation';
import { AuthService } from './../../services/auth.service';
import { UserEvaluationService } from './../../services/user-evaluation.service';
import { EvaluationService } from './../../services/evaluation.service';
import { ModalService } from './../../components/modal/modal.service';
import { Component, OnInit } from '@angular/core';

import * as Chartist from 'chartist';

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

  public users = []
  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private evaluationService: EvaluationService,
    private evaluationRequestService: EvaluationRequestService,
    private userEvaluationService: UserEvaluationService,
    private auth: AuthService) {
  }


  ngOnInit() {
    this.evaluationRequest.requester = this.auth.user;
    this.evaluationRequestform = new EvaluationRequestForm(this.fb)

    this.activityChartType = ChartType.Bar;
    this.activityChartOptions = {
      seriesBarDistance: 10,
      reverseData: true,
      horizontalBars: true,
      axisY: {
        offset: 70
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
      { title: 'Semana anterior', imageClass: 'fa fa-circle text-info' },
      { title: 'Semana Actual', imageClass: 'fa fa-circle text-danger' },
      { title: 'Em curso', imageClass: 'fa fa-circle text-warning' }
    ];



    this.userEvaluationService.all({ userId: this.auth.user.id }).subscribe(evaluations => {
      this.evaluationService.all().subscribe(evaluations => {
        evaluations.forEach(e => {
          e.points = this.evaluationPoints(e.id);
        })
        this.evaluations = this.groupBy(evaluations, 'group')
      })
      this.userEvaluations = evaluations
    })
  }
  filterValues(input) {
    let filter = this.evaluationRequest.requested.email;
    if (filter.length > 3)
      this.auth.all({ $filter: filter }).subscribe(users => {
        this.users = users
        if (ValidationService.emailValidator({ value: filter }) == null) {
          this.users.push({ firstName: filter, email: filter })
        }
      })

  }
  getActivityChartData(section) {
    let arr = [[1], [2], [4]];
    this.activityChartData = this.evaluations.filter(x => x[0] === section)[0][1]
    let y = (this.activityChartData.reduce((t: number, v) => { return t + (parseInt(v.points)) }, 0) / (arr.length)).toFixed(2)

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

  askEvaluation() {
    this.evaluationRequestService.create(this.evaluationRequest).subscribe(request => {
      if (request.id) {
        Swal.fire(
          'Good job!',
          'Sua avaliação foi solicitada com sucesso',
          'success'
        )
        this.evaluationRequest = new EvaluationRequest();
        this.evaluationRequest.requester = this.auth.user;
        this.closeModal('ask-evaluation-modal')
      }
    })
  }
  openModal(id: string, v: Evaluation) {
    //this.currentEvaluation.evaluation = v
    //this.currentEvaluation.points = 0
    this.modalService.open(id);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
}
