import { Observable } from 'rxjs';
import { IService } from './../service.interface';
import { HttpClient } from '@angular/common/http';
import { FeedbackItem } from './../../models/coaching/feedback_item';
import { AppService } from './../app.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackItemService  extends AppService<FeedbackItem> implements IService<FeedbackItem> {

  
  constructor(public http: HttpClient) {
    super(http, 'coaching.feedback_items');
  }

  one(id: string): Observable<FeedbackItem> {
    return this.getOne(id)
  }

  all(f: any={}): Observable<Array<FeedbackItem>> {
    return this.getAll(f)
  }

  update(o: any): Observable<FeedbackItem> {
    return this.updateOne(o);
  }

  create(o: any): Observable<FeedbackItem> {
    return this.createOne(o)
  }
}