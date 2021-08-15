import { ToastService } from 'ng-uikit-pro-standard';

import { UserEvaluation } from 'app/models/diagnostic/user-evaluation';
import { UserEvaluationService } from 'app/services/user-evaluation.service';
import { AuthService } from 'app/services/auth.service';
import { GoalService } from 'app/services/goal.service';
import { Goal } from 'app/models/goal/goal';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GoalForm } from './../../../forms/goal.form';
import { ModalService } from './../../../components/modal/modal.service';
import { Component, OnInit } from '@angular/core';
import { PartialGoal } from 'app/models/goal/partial-goal';
import { ActivatedRoute } from '@angular/router';
import { EvaluationService } from 'app/services/evaluation.service';
import { Evaluation } from 'app/models/diagnostic/evaluation';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public currentResults = { name: null, currentResults: [], groups: [] };
  public currentResultsIsLoading = true;
  public otherResults = ['Pessoal', 'Profissional', 'Financeiro'];
  public userEvaluations: Array<UserEvaluation> = [];
  public evaluations: Array<Evaluation> = [];
  goal = new Goal();
  form = new GoalForm(this.goal)

  get controls() {
    return this.form.controls;
  }
  public results = [
    { code: 'S', name: 'Forças', evaluations: [], groups: [], class: 'bg-info', conditions: (x) => x },
    { code: 'W', name: 'Fraquezas', evaluations: [], groups: [], class: 'bg-danger', conditions: (x) => !x }
  ];


  public diagnosticDatas: any = {};
  public evaluationDatas: any = {}
  public weakness = [];
  public strengths = []

  constructor(
    private auth: AuthService,
    private modalService: ModalService,
    private fb: FormBuilder,
    private userEvaluationService: UserEvaluationService,
    private goalService: GoalService,
    private toast: ToastService,

  ) { }

  ngOnInit(): void {
    this.currentResultsIsLoading=true;
    this.goal.user = this.auth.user;
    this.goal.partials = [new PartialGoal(), new PartialGoal(), new PartialGoal(), new PartialGoal()];
    this.userEvaluationService.all({ requesterId: this.auth.user.id }).subscribe(userEvaluations => {

      const evs = []
      userEvaluations.forEach((ev) => {
        if (!evs.map(x => x[0]).includes(ev.evaluation.name)) {
          evs.push([ev.evaluation.name, userEvaluations.filter(e => e.evaluation.name === ev.evaluation.name)])
        }
      })
      evs.forEach((e, k) => {

        const points = (e[1].reduce((r, s) => r + parseInt(s.points), 0) / e[1].length)
        if (points === 4) {
          e.push(true)
        } else if (points < 3) {
          e.push(false)
        } else {
          evs.splice(k, 1);
        }

      })
      this.userEvaluations = userEvaluations
      this.results.forEach(result => {


        result.evaluations = evs
          .filter(evaluation => result.conditions(evaluation[2])).map(g => g[1][0].evaluation);

        result.groups = this.groupBy(result.evaluations, 'group')

        result.groups = Object.keys(result.groups).map((key) => [key, result.groups[key]]);


        const evaluationsGross = userEvaluations.reduce((result, currentObject) => {
          const val = currentObject.evaluation['group']
          result[val] = result[val] || []
          result[val].push(currentObject)
          return result
        }, {})

        let evaluationArr: Array<Array<any>>;
        evaluationArr = Object.entries(evaluationsGross)
        evaluationArr.forEach(((arr) => {
          arr[3] = (arr[1].reduce((t: number, v) => { return t + (parseInt(v.points)) }, 0) / (arr[1].length)).toFixed(2);
        }))

        this.evaluationDatas = { labels: evaluationArr.map(x => x[0]), data: evaluationArr.map(x => parseFloat(x[3])) }



      })
      this.currentResultsIsLoading=false
    })
  }
  groupBy = (xs, key) => {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
  setAnualGoal() {
    this.goal.anualGoal = this.goal.partials.reduce((x: number, y) => { return x + (y.value || 0) }, 0)
  }
  setPartialGoal() {

    this.goal.partials.forEach(x => {
      x.value = this.goal.anualGoal / 4
    })
  }
  saveGoal() {
    if (this.form.dirty && this.form.valid) {
      this.goalService.create(this.goal).subscribe(goal => {
        this.goal = new Goal()
        this.goal.partials = [new PartialGoal(), new PartialGoal(), new PartialGoal(), new PartialGoal()];

        this.toast.success('Resultados esperado registado com sucesso', 'Sucesso', {
          timeOut: 50000,
          progressBar: true,
        })
        this.modalService.close('result-modal')
      })
    } else {
      this.form.validateAllFormFields();
    }
  }
  openModal(id) {
    this.modalService.open(id);
  }

  registGoal(s, g) {
    this.goal.group = g
    this.goal.val = s
    this.openModal('result-modal')
  }

  otherResultsx(e) {
    return ['Pessoal', 'Profissional', 'Financeiro'].filter(x => !e.groups.map(x => x[0]).includes(x))
  }


  notIn(arr: Array<any>, a): boolean {
    return arr.filter(x => x !== a).length === 0
  }

  groupByx = (xs, key) => {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  setResultsx(e) {
    this.currentResults = e
    this.otherResults = ['Pessoal', 'Profissional', 'Financeiro'].filter(x => !e.groups.map(x => x[0]).includes(x))
  }

  accordion(that: any): void {

    that.classList.toggle("pe-7s-angle-up");
    that.classList.toggle("pe-7s-angle-down");

    const panel = document.getElementById(that.getAttribute('title'))
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }


  }


  /**
   * refine
   */
}
