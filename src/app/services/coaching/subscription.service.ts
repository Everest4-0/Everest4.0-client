import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IService } from './../service.interface';
import { AppService } from './../app.service';
import { Injectable } from '@angular/core';
import { Subscription } from 'app/models/coaching/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService extends AppService<Subscription> implements IService<Subscription> {

  constructor(public http: HttpClient) {
    super(http, 'coaching.subscriptions');
  }
  one(id: string): Observable<Subscription> {
    return this.getOne(id)
  }

  all(f: any={}): Observable<Array<Subscription>> {
    return this.getAll(f)
  }

  update(o: any): Observable<Subscription> {
    return this.updateOne(o);
  }
  
  delete(o:any):Observable<Subscription>{
    return this.deleteOne(o);
  }

  create(o: any): Observable<Subscription> {
    return this.createOne(o)
  }
}
