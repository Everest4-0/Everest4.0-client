import { IService } from './../service.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FeedbackComment } from './../../models/coaching/feedback_comment';
import { AppService } from './../app.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackCommentService  extends AppService<FeedbackComment> implements IService<FeedbackComment> {

  constructor(public http: HttpClient) {
    super(http, 'coaching.feedback_comments');
  }

  one(id: string): Observable<FeedbackComment> {
    return this.getOne(id)
  }

  all(f: any={}): Observable<Array<FeedbackComment>> {
    return this.getAll(f)
  }

  update(o: any): Observable<FeedbackComment> {
    return this.updateOne(o);
  }

  create(o: any): Observable<FeedbackComment> {
    return this.createOne(o)
  }
}