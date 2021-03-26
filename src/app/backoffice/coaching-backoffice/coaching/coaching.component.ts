import { CoachingSubscriptionService } from './../../../services/coaching/coaching-subscription.service';
import { Component, OnInit } from '@angular/core';
import { Chat } from 'app/models/main/chat';

@Component({
  selector: 'app-coaching',
  templateUrl: './coaching.component.html',
  styleUrls: ['./coaching.component.css']
})
export class CoachingComponent implements OnInit {

  public chats: Array<Chat> = []
  constructor(private subscriptionService: CoachingSubscriptionService) { }

  ngOnInit(): void {
    this.subscriptionService.all().subscribe(subscriptions => {
      this.chats = subscriptions.map(subscription => subscription.chat)
    })
  }

}
