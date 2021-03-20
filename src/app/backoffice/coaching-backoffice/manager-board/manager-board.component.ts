import { FeedbackItem } from './../../../models/coaching/feedback_item';
import { FeedbackItemService } from './../../../services/coaching/feedback-item.service';
import { ActivatedRoute } from '@angular/router';
import { CoachingSubscriptionService } from './../../../services/coaching/coaching-subscription.service';
import { UserEvaluationService } from './../../../services/user-evaluation.service';
import { GoalService } from './../../../services/goal.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from './../../../services/auth.service';
import { GoalForm } from './../../../forms/goal.form';
import { Goal } from './../../../models/goal/goal';
import { UserEvaluation } from './../../../models/diagnostic/user-evaluation';
import { CoachingSubscription } from './../../../models/coaching/coaching_subscription';
import { Component, OnInit } from '@angular/core';
import { PartialGoal } from 'app/models/goal/partial-goal';
import { Feedback } from 'app/models/coaching/feedback';

@Component({
  selector: 'app-manager-board',
  templateUrl: './manager-board.component.html',
  styleUrls: ['./manager-board.component.scss']
})
export class ManagerBoardComponent implements OnInit {


  public results = [
    { code: 'S', name: 'Forças', evaluations: [], groups: [], class: 'bg-info', conditions: (x) => x },
    { code: 'W', name: 'Fraquezas', evaluations: [], groups: [], class: "bg-danger", conditions: (x) => !x }
  ];

  public subscription: CoachingSubscription = new CoachingSubscription();
  public currentResults = [];
  public otherResults = ['Pessoal', 'Profissional', 'Financeiro'];
  public evaluations: Array<UserEvaluation> = [];
  goal = new Goal();

  public diagnosticDatas: any = {};
  public evaluationDatas:Array<any> = []; 
  public weakness = [];
  public strengths = []

  public feedbacItems: Array<FeedbackItem> = []
  constructor(

    public auth: AuthService,
    private goalService: GoalService,
    private evaluationService: UserEvaluationService,
    private coachingSubscriptionService: CoachingSubscriptionService,
    private route: ActivatedRoute,
    private feedbacItemService: FeedbackItemService,
  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];
    this.coachingSubscriptionService.one(id).subscribe(coachingSubscription => {
      this.subscription = coachingSubscription;
    })
    this.goal.user = this.auth.user;
    this.goal.partials = [new PartialGoal(), new PartialGoal(), new PartialGoal(), new PartialGoal()];
    this.evaluationService.all({ userId: this.auth.user.id }).subscribe(evaluations => {

      this.evaluations = evaluations

      let evaluationsGross = evaluations.reduce((result, currentObject) => {
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

      this.diagnosticDatas = { labels: evaluationArr.map(x => x[0]), data: evaluationArr.map(x => parseFloat(x[3])) }

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
  feedbackListUpdate(feedbacks: Array<Feedback>) {
    this.evaluationDatas = []
    let items = feedbacks[0].points.map(point => point.item)
    items.forEach((item, i) => {
      this.evaluationDatas.push(
        {
          label: item.title,
          fill: false,
          lineTension: 0,
          borderColor: ['#9467bd', '#fdbf6f', '#1f77b4', '#cccccc', '#bb2255', '#b17428'][i],
          data: feedbacks.map(feedback => feedback.points.filter(point => point.item.id === item.id)[0].point),

        })
    })
  }
  groupBy = (xs, key) => {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  setResults(e) {

    let u = this.results;
    this.currentResults = e
    this.otherResults = ['Pessoal', 'Profissional', 'Financeiro'].filter(x => !e.groups.map(x => x[0]).includes(x))
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