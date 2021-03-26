import { ToastService } from 'ng-uikit-pro-standard';

import { UserEvaluation } from 'app/models/diagnostic/user-evaluation';
import { UserEvaluationService } from 'app/services/user-evaluation.service';
import { AuthService } from 'app/services/auth.service';
import { GoalService } from 'app/services/goal.service';
import { Goal } from 'app/models/goal/goal';
import { FormBuilder } from '@angular/forms';
import { GoalForm } from './../../../forms/goal.form';
import { ModalService } from './../../../components/modal/modal.service';
import { Component, OnInit } from '@angular/core';
import { PartialGoal } from 'app/models/goal/partial-goal';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {


  public results = [
    { code: 'S', name: 'Forças', evaluations: [], groups: [], class: 'bg-info', conditions: (x) => x },
    { code: 'W', name: 'Fraquezas', evaluations: [], groups: [], class: "bg-danger", conditions: (x) => !x }
    /*{ code: 'O', name: 'Oportunidades' },
    { code: 'T', name: 'Ameaças' },*/
  ]
  public currentResults = [];
  public otherResults = ['Pessoal', 'Profissional', 'Financeiro'];
  public evaluations: Array<UserEvaluation> = [];
  goal = new Goal();
  form = new GoalForm(this.fb, this.goal)

  constructor(
    private auth: AuthService,
    private modalService: ModalService,
    private fb: FormBuilder,
    private evaluationService: UserEvaluationService,
    private goalService: GoalService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {

    this.goal.user = this.auth.user;
    this.goal.partials = [new PartialGoal(), new PartialGoal(), new PartialGoal(), new PartialGoal()];
    this.evaluationService.all({ userId: this.auth.user.id }).subscribe(evaluations => {

      let fin = []
      let evs = []
      let setEv = evaluations.forEach((ev) => {
        if (!evs.map(x => x[0]).includes(ev.evaluation.name))
          evs.push([ev.evaluation.name, evaluations.filter(e => e.evaluation.name === ev.evaluation.name)])
      })
      evs.forEach((e, k) => {
        
        let points = (e[1].reduce((r, s) => r + parseInt(s.points), 0) / e[1].length)
        if (points === 4) {
          e.push(true)
        }
        else if (points < 3) {
          e.push(false)
        } else {
          evs.splice(k, 1);
        }

      })
      this.evaluations = evaluations
      let full = evaluations.reduce((x, y) => x + parseInt(y.points + ''), 0)
      this.results.forEach(result => {


        result.evaluations = evs
          .filter(evaluation => result.conditions(evaluation[2])).map(g => g[1][0].evaluation);

        /* result.evaluations = evaluations
           .filter(evaluation => result.conditions(evaluation.points) && evaluation.requested === null);*/
        result.groups = this.groupBy(result.evaluations, 'group')/*result.evaluations.map(x => x.group)
          .filter((value, index, self) => {
            return self.indexOf(value) === index;
          })*/
        result.groups = Object.keys(result.groups).map((key) => [key, result.groups[key]]);
      })
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

    this.goalService.create(this.goal).subscribe(goal => {
      this.goal = new Goal()
      this.goal.partials = [new PartialGoal(), new PartialGoal(), new PartialGoal(), new PartialGoal()];

      this.toast.success('Resultados esperado registado com sucesso', 'Sucesso', {
        timeOut: 50000,
        progressBar: true,
      })
      this.modalService.close('result-modal')
    })
  }
  openModal(id) {
    this.modalService.open(id);
  }

  registGoal(s, g) {
    this.goal.group = g
    this.goal.val = s
    this.openModal('result-modal')
  }

  setResults(e) {

    let u = this.results;
    this.currentResults = e
    this.otherResults = ['Pessoal', 'Profissional', 'Financeiro'].filter(x => !e.groups.map(x => x[0]).includes(x))
  }
}
