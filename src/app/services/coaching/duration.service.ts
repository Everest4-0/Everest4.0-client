import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IService } from './../service.interface';
import { Duration } from './../../models/coaching/duration';
import { AppService } from './../app.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DurationService extends AppService<Duration> implements IService<Duration> {

  constructor(public http: HttpClient) {
    super(http, 'coaching.durations');
  }
  one(id: string): Observable<Duration> {
    return this.getOne(id)
  }

  all(f: any={}): Observable<Array<Duration>> {
    return this.getAll(f)
  }

  update(o: any): Observable<Duration> {
    return this.updateOne(o);
  }
  
  delete(o:any):Observable<Duration>{
    return this.deleteOne(o);
  }

  create(o: any): Observable<Duration> {
    return this.createOne(o)
  }
}
