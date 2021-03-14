import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IService } from './../service.interface';
import { Injectable } from '@angular/core';
import { Goal } from 'app/models/coaching/goal';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class GoalService extends AppService<Goal> implements IService<Goal> {

  constructor(public http: HttpClient) {
    super(http, 'coaching.goals');
  }
  one(id: string): Observable<Goal> {
    return this.getOne(id)
  }

  all(f: any={}): Observable<Array<Goal>> {
    return this.getAll(f)
  }

  update(o: any): Observable<Goal> {
    return this.updateOne(o);
  }
  
  delete(o:any):Observable<Goal>{
    return this.deleteOne(o);
  }

  create(o: any): Observable<Goal> {
    return this.createOne(o)
  }
}
