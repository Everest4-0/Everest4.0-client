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
    { code: 'S', name: 'Forças', evaluations: [], groups: [], class: 'bg-info', conditions: (x) => x == 4 },
    { code: 'W', name: 'Fraquezas', evaluations: [], groups: [], class: "bg-danger", conditions: (x) => x < 3 }
    /*{ code: 'O', name: 'Oportunidades' },
    { code: 'T', name: 'Ameaças' },*/
  ]
  public currentResults = [];
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

      this.evaluations = evaluations
      this.results.forEach(result => {
        result.evaluations = evaluations
          .filter(evaluation => result.conditions(evaluation.points));

        result.groups = result.evaluations.map(x => x.evaluation.group)
          .filter((value, index, self) => {
            return self.indexOf(value) === index;
          }
          )
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
    this.currentResults = e
  }
}
