import { HttpClient } from '@angular/common/http';
import { IService } from './service.interface';
import { Goal } from './../models/goal/goal';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoalService extends AppService<Goal> implements IService<Goal> {

  public goal: Goal;
  constructor(public http: HttpClient) {
    super(http, 'goals');
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

  create(o: any): Observable<Goal> {
    return this.createOne(o)
  }
}