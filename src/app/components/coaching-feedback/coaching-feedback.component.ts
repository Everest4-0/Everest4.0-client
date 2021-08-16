import { FeedBackCommentForm } from './../../backoffice/forms/feedback_comment.form';
import { FeedbackCommentService } from './../../services/coaching/feedback-comment.service';
import { CoachingSubscription } from './../../models/coaching/coaching_subscription';
import { FeedbackItem } from './../../models/coaching/feedback_item';
import { ModalService } from './../modal/modal.service';
import { FeedBackForm } from './../../backoffice/forms/feedback.form';
import { Feedback } from './../../models/coaching/feedback';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FeedbackItemService } from 'app/services/coaching/feedback-item.service';
import { FeedbackPoint } from 'app/models/coaching/feedback_points';
import { FeedbackService } from 'app/services/coaching/feedback.service';
import { FeedbackComment } from 'app/models/coaching/feedback_comment';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-coaching-feedback',
  templateUrl: './coaching-feedback.component.html',
  styleUrls: ['./coaching-feedback.component.scss']
})
export class CoachingFeedbackComponent implements OnInit {

  @Input() role = ''
  @Input() subscription: CoachingSubscription = new CoachingSubscription()
  @Output() feedbackListUpdate: EventEmitter<Array<Feedback>> = new EventEmitter<Array<Feedback>>();


  public cssClass = this.role === 'coach' ? 'red' : 'default'
  public editing = false;
  public feedback: Feedback = new Feedback();
  public feedbacks: Array<Feedback> = [];
  public feedbacksPaginated: Array<Feedback> = [];
  public feedbackItems: Array<FeedbackItem> = [];
  public comment: FeedbackComment = new FeedbackComment();
  public commentForm = new FeedBackCommentForm();
  public form = new FeedBackForm();

  onChangePage = (items) => this.feedbacksPaginated = items

  constructor(
    public auth: AuthService,
    private feedbackItemService: FeedbackItemService,
    private feedbackService: FeedbackService,
    private modalService: ModalService,
    private feedbackCommentService: FeedbackCommentService
  ) { }

  ngOnInit(): void {

    this.feedbackService.all().subscribe(feedbacks => {
      this.feedbacks = feedbacks.reverse()

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
  }
  openModal(feedback = null) {

    if (feedback !== null) {
      this.feedback = feedback
    } else {
      this.feedback = new Feedback();
      this.feedback.points =
        this.feedbackItems.map(item => new FeedbackPoint(item))
    }
    this.editing = this.feedback.id !== undefined;
    this.modalService.open('feedback-modal');
  }
  feedbackView(feedback: Feedback, i) {
    feedback.orderNo = i;
    this.feedback = feedback

    this.feedbackCommentService.all({ feedbackId: this.feedback.id }).subscribe(comments => {
      this.feedback.comments = comments;
      this.scrollToEnd()
    })
    this.modalService.open('feedback-view-modal');
  }

  sendComment() {
    this.comment.feedback = this.feedback;
    this.feedbackCommentService.create(this.comment).subscribe(comment => {
      this.feedback.comments.push(comment)
      this.comment = new FeedbackComment();
      this.scrollToEnd()
    })
  }

  scrollToEnd() {
    setTimeout(() => {
      const elem = document.getElementById('card-body');
      elem.scrollTop = elem.scrollHeight;
    }, 500)
  }
  closeModal() {

    this.modalService.close('feedback-modal');
  }

  points(feedback) {
    return (feedback.points.reduce((x, y) => x + y.point, 0) / feedback.points.length).toFixed(2)
  }
}
