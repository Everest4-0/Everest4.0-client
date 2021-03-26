import { User } from 'app/models/main/user';
import { CoachingSubscriptionForm } from './../../../forms/coaching-subscription';
import { ToastService } from 'ng-uikit-pro-standard';
import { CoachingGoal } from 'app/models/coaching/coaching_goal';
import { CoachingGoalService } from './../../../services/coaching/coaching-goal.service';
import { CoachingDurationService } from './../../../services/coaching/coaching-duration.service';
import { CoachingDuration } from '../../../models/coaching/coaching_duration';
import { CoachingSubscription } from './../../../models/coaching/coaching_subscription';
import { CoachingSubscriptionService } from './../../../services/coaching/coaching-subscription.service';
import { UserEvaluationService } from './../../../services/user-evaluation.service';
import { AuthService } from 'app/services/auth.service';
import { GoalService } from 'app/services/goal.service';
import { Goal } from 'app/models/goal/goal';
import { FormBuilder } from '@angular/forms';
import { GoalForm } from './../../../forms/goal.form';
import { UserEvaluation } from './../../../models/diagnostic/user-evaluation';
import { Component, OnInit, Input } from '@angular/core';
import { PartialGoal } from 'app/models/goal/partial-goal';
import { Router } from "@angular/router"
import { ActivatedRoute } from '@angular/router';
import { ModalService } from 'app/components/modal';


@Component({
  selector: 'app-coaching-dashboard',
  templateUrl: './coaching-dashboard.component.html',
  styleUrls: ['./coaching-dashboard.component.scss']
})
export class CoachingDashboardComponent implements OnInit {

  public results = [
    { code: 'S', name: 'Forças', evaluations: [], groups: [], class: 'bg-info', conditions: (x) => x },
    { code: 'W', name: 'Fraquezas', evaluations: [], groups: [], class: "bg-danger", conditions: (x) => !x }
  ];

  public currentResults = [];
  public otherResults = ['Pessoal', 'Profissional', 'Financeiro'];
  public evaluations: Array<UserEvaluation> = [];
  goal = new Goal();

  public evaluationDatas: any = {};
  public weakness = [];
  public strengths = [];

  public subscriptions: Array<CoachingSubscription> = [];
  public subscription: CoachingSubscription = new CoachingSubscription();

  public coachingDurations: Array<CoachingDuration> = [];
  public coachingGoals: Array<CoachingGoal> = [];
  public coaches: Array<User> = [];

  form = new CoachingSubscriptionForm(this.fb);

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private goalService: GoalService,
    private evaluationService: UserEvaluationService,
    private modalService: ModalService,
    private coachingSubscriptionService: CoachingSubscriptionService,
    private coachingDurationService: CoachingDurationService,
    private coachingGoalService: CoachingGoalService,
    private toast: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {

    
    this.auth.all({ '$filter': 'COACH' }).subscribe(users => this.coaches = users)
    this.coachingSubscriptionService.all({ userId: this.auth.user.id }).subscribe(subscriptions => {
      
      this.subscriptions = subscriptions;
      if (subscriptions.length > 0) {
        this.subscription = subscriptions[0];
      }

    })

    this.coachingDurationService.all().subscribe(durations => {
      this.coachingDurations = durations.sort((a, b) => { return (a.months < b.months) ? -1 : 1; });
    })

    this.coachingGoalService.all().subscribe(goals => {
      this.coachingGoals = goals;
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
  }
  setResults(e) {

    let u = this.results;
    this.currentResults = e
    this.otherResults = ['Pessoal', 'Profissional', 'Financeiro'].filter(x => !e.groups.map(x => x[0]).includes(x))
  }

  openSubscription() {
    this.modalService.open('coach-subscription')
  }

  discard() {
    this.modalService.close('coach-subscription')
  }
  saveSubcription() {
    this.coachingSubscriptionService.create(this.subscription).subscribe(subscription => {
      this.subscription = subscription;
      this.discard()
    })
  }
  selectCoach(coach){
    this.subscription.coach=coach;
    this.coachingSubscriptionService.update(this.subscription).subscribe(subscription => {
      this.subscription = subscription;
      this.router.navigate(['/me/coaching/board/'+ subscription.id])
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


