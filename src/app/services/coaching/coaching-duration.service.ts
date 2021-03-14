import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IService } from './../service.interface';
import { CoachingDuration } from '../../models/coaching/coaching_duration';
import { AppService } from './../app.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoachingDurationService extends AppService<CoachingDuration> implements IService<CoachingDuration> {

  constructor(public http: HttpClient) {
    super(http, 'coaching.durations');
  }
  one(id: string): Observable<CoachingDuration> {
    return this.getOne(id)
  }

  all(f: any={}): Observable<Array<CoachingDuration>> {
    return this.getAll(f)
  }

  update(o: any): Observable<CoachingDuration> {
    return this.updateOne(o);
  }
  
  delete(o:any):Observable<CoachingDuration>{
    return this.deleteOne(o);
  }

  create(o: any): Observable<CoachingDuration> {
    return this.createOne(o)
  }
}
