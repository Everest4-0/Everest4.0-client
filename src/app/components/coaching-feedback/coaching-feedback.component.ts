import { CoachingSubscription } from './../../models/coaching/coaching_subscription';
import { FeedbackItem } from './../../models/coaching/feedback_item';
import { ModalService } from './../modal/modal.service';
import { FeedBackForm } from './../../backoffice/forms/feedback.form';
import { Feedback } from './../../models/coaching/feedback';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FeedbackItemService } from 'app/services/coaching/feedback-item.service';
import { FeedbackPoint } from 'app/models/coaching/feedback_points';
import { FeedbackService } from 'app/services/coaching/feedback.service';

@Component({
  selector: 'app-coaching-feedback',
  templateUrl: './coaching-feedback.component.html',
  styleUrls: ['./coaching-feedback.component.scss']
})
export class CoachingFeedbackComponent implements OnInit {

  @Input() cssClass = 'default'
  @Input() subscription: CoachingSubscription = new CoachingSubscription()

  @Output() feedbackListUpdate: EventEmitter<Array<Feedback>> = new EventEmitter<Array<Feedback>>();


  public editing = false;
  public feedback: Feedback = new Feedback();
  public feedbacks: Array<Feedback> = [];
  public feedbackItems: Array<FeedbackItem> = [];
  public form = new FeedBackForm();
  constructor(
    private feedbackItemService: FeedbackItemService,
    private feedbackService: FeedbackService,
    private modalService: ModalService) { }

  ngOnInit(): void {

    this.feedbackService.all().subscribe(feedbacks => {
      this.feedbacks = feedbacks

      this.feedbackListUpdate.emit(this.feedbacks);
    })
    this.feedbackItemService.all().subscribe(items => {
      this.feedbackItems = items
      this.feedback.points =
        items.map(item => new FeedbackPoint(item))
    });
  }

  onSubmit() {
    return this.feedback.id
      ? this.update()
      : this.create()
  }

  create() {
    this.feedback.subscription = this.subscription;
    this.feedbackService.create(this.feedback).subscribe(feedback => {
      this.feedbacks.push(feedback);
      this.modalService.close('feedback-modal');
      this.feedbackListUpdate.emit(this.feedbacks);
    })
  }

  update() {
    /* this.noteService.update(this.note).subscribe(note => {
       this.notes.filter(n => n.id === note.id)[0] = note;
       this.modalService.close('note-modal');
     })*/
  }
  openModal(feedback = null) {

    if (feedback !== null)
      this.feedback = feedback
    else {
      this.feedback = new Feedback();
      this.feedback.points =
        this.feedbackItems.map(item => new FeedbackPoint(item))
    }
    this.editing = this.feedback.id !== undefined;
    this.modalService.open('feedback-modal');
  }
  closeModal() {

    this.modalService.close('feedback-modal');
  }

  points(feedback) {
    
    return (feedback.points.reduce((x, y) => x + y.point, 0) / feedback.points.length).toFixed(2)
  }
}
