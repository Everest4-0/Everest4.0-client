import { IService } from './service.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserEvaluation } from './../models/user-evaluation';
import { AppService } from './app.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserEvaluationService  extends AppService<UserEvaluation> implements IService<UserEvaluation> {

  public selfEvaluation: UserEvaluation;
  constructor(public http: HttpClient) {
    super(http, 'user-evaluations');
  }

  one(id: string): Observable<UserEvaluation> {
    return this.getOne(id)
  }

  all(f: any={}): Observable<Array<UserEvaluation>> {
    return this.getAll(f)
  }

  update(o: any): Observable<UserEvaluation> {
    return this.updateOne(o);
  }

  create(o: any): Observable<UserEvaluation> {
    return this.createOne(o)
  }
}