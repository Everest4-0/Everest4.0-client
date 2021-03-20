import { CoachingSubscription } from './../../../models/coaching/coaching_subscription';
import { CoachingSubscriptionService } from './../../../services/coaching/coaching-subscription.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coaching-dashboard',
  templateUrl: './coaching-dashboard.component.html',
  styleUrls: ['./coaching-dashboard.component.scss']
})
export class CoachingDashboardComponent implements OnInit {

  public lessSbscriptions: Array<any> = [];
  public subscriptions: Array<CoachingSubscription> = []
  public subscription: CoachingSubscription = new CoachingSubscription()
  constructor(
    public auth: AuthService,
    private coachingSubscriptionService: CoachingSubscriptionService
  ) { }

  ngOnInit(): void {
    this.coachingSubscriptionService.all({ coachId: this.auth.user.id }).subscribe(subscriptions => {
      this.subscriptions = subscriptions;

      for (let i = 0; i < 4 - subscriptions.length; i++) {
        this.lessSbscriptions.push(i)
      }
    })
  }

}
