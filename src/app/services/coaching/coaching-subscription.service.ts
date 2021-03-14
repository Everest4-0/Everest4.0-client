import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IService } from './../service.interface';
import { CoachingSubscription } from './../../models/coaching/coaching_subscription';
import { AppService } from './../app.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoachingSubscriptionService extends AppService<CoachingSubscription> implements IService<CoachingSubscription> {

  constructor(public http: HttpClient) {
    super(http, 'coaching.subscriptions');
  }

  one(id: string): Observable<CoachingSubscription> {
    return this.getOne(id)
  }

  all(f: any={}): Observable<Array<CoachingSubscription>> {
    return this.getAll(f)
  }

  update(o: any): Observable<CoachingSubscription> {
    return this.updateOne(o);
  }

  create(o: any): Observable<CoachingSubscription> {
    return this.createOne(o)
  }
}