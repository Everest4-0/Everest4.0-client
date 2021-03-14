import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IService } from '../service.interface';
import { Injectable } from '@angular/core';
import { CoachingGoal } from 'app/models/coaching/coaching_goal';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class CoachingGoalService extends AppService<CoachingGoal> implements IService<CoachingGoal> {

  constructor(public http: HttpClient) {
    super(http, 'coaching.goals');
  }
  one(id: string): Observable<CoachingGoal> {
    return this.getOne(id)
  }

  all(f: any={}): Observable<Array<CoachingGoal>> {
    return this.getAll(f)
  }

  update(o: any): Observable<CoachingGoal> {
    return this.updateOne(o);
  }
  
  delete(o:any):Observable<CoachingGoal>{
    return this.deleteOne(o);
  }

  create(o: any): Observable<CoachingGoal> {
    return this.createOne(o)
  }
}
