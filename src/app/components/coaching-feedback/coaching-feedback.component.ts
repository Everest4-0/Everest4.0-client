import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-coaching-feedback',
  templateUrl: './coaching-feedback.component.html',
  styleUrls: ['./coaching-feedback.component.scss']
})
export class CoachingFeedbackComponent implements OnInit {

  @Input() cssClass = 'default'

  constructor() { }

  ngOnInit(): void {
  }
  openModal() { }
}
