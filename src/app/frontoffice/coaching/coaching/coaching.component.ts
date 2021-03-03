import { UserEvaluation } from './../../../models/diagnostic/user-evaluation';
import { Goal } from './../../../models/goal/goal';
import { ToastService } from 'ng-uikit-pro-standard';
import { GoalService } from './../../../services/goal.service';
import { UserEvaluationService } from './../../../services/user-evaluation.service';
import { ModalService } from './../../../components/modal/modal.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coach',
  templateUrl: './coaching.component.html',
  styleUrls: ['./coaching.component.scss']
})
export class CoachingComponent implements OnInit {

  public results = [
    { code: 'S', name: 'Forças', evaluations: [], groups: [], otherGroups: [], class: 'bg-info', conditions: (x) => x },
    { code: 'W', name: 'Fraquezas', evaluations: [], groups: [], otherGroups: [], class: "bg-danger", conditions: (x) => !x }
    /*{ code: 'O', name: 'Oportunidades' },
    { code: 'T', name: 'Ameaças' },*/
  ]
  public currentResults = [];
  public otherResults = ['Pessoal', 'Profissional', 'Financeiro'];
  public evaluations: Array<UserEvaluation> = [];
  goal = new Goal();

  public evaluationDatas: any = {};
  public weakness = [];
  public strengths = []


  constructor(
    private auth: AuthService,
    private modalService: ModalService,

    private evaluationService: UserEvaluationService,
    private goalService: GoalService,
    private toast: ToastService
  ) { }


  ngOnInit(): void {

    this.evaluationService.all({ userId: this.auth.user.id }).subscribe(evaluations => {

      this.evaluations = evaluations

      let evaluationsGross = evaluations.reduce((result, currentObject) => {
        const val = currentObject.evaluation['group']
        result[val] = result[val] || []
        result[val].push(currentObject)
        return result
      }, {})

      let evaluationArr: Array<Array<any>>;
          evaluationArr= Object.entries(evaluationsGross)
      evaluationArr.forEach(((arr) => {
        arr[3] = (arr[1].reduce((t: number, v) => { return t + (parseInt(v.points)) }, 0) / (arr[1].length)).toFixed(2);
      }))

      this.evaluationDatas = { labels: evaluationArr.map(x => x[0]), data: evaluationArr.map(x => parseFloat(x[3])) }

      let evs = []
      evaluations.forEach((ev) => {
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

      this.results.forEach(result => {

        result.evaluations = evs.filter(evaluation => result.conditions(evaluation[2])).map(g => g[1][0].evaluation);

        result.groups = this.groupBy(result.evaluations, 'group')

        result.groups = Object.keys(result.groups).map((key) => [key, result.groups[key]]);

        result.otherGroups = ['Pessoal', 'Profissional', 'Financeiro'].filter(x => !result.groups.map(x => x[0]).includes(x))
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



  accordion(that: any): void {

    that.classList.toggle("pe-7s-angle-up");
    that.classList.toggle("pe-7s-angle-down");

    var panel = document.getElementById(that.getAttribute('title'))
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }


  }
}
