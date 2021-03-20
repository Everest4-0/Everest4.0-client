import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IService } from './../service.interface';
import { AppService } from './../app.service';
import { Feedback } from './../../models/coaching/feedback';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService extends AppService<Feedback> implements IService<Feedback> {

  
  constructor(public http: HttpClient) {
    super(http, 'coaching.feedbacks');
  }

  one(id: string): Observable<Feedback> {
    return this.getOne(id)
  }

  all(f: any={}): Observable<Array<Feedback>> {
    return this.getAll(f)
  }

  update(o: any): Observable<Feedback> {
    return this.updateOne(o);
  }

  create(o: any): Observable<Feedback> {
    return this.createOne(o)
  }
}