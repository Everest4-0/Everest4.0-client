import { Observable } from 'rxjs';
import { SelfEvaluation } from './../models/self-evaluation';
import { HttpClient } from '@angular/common/http';
import { IService } from './service.interface';
import { AppService } from './app.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelfEvaluationService extends AppService<SelfEvaluation> implements IService<SelfEvaluation> {

  public selfEvaluation: SelfEvaluation;
  constructor(public http: HttpClient) {
    super(http, 'self-evaluations');
  }

  one(id: string): Observable<SelfEvaluation> {
    return this.getOne(id)
  }

  all(f: any={}): Observable<Array<SelfEvaluation>> {
    return this.getAll(f)
  }

  update(o: any): Observable<SelfEvaluation> {
    return this.updateOne(o);
  }

  create(o: any): Observable<SelfEvaluation> {
    return this.createOne(o)
  }

}