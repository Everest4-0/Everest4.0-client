import { Observable } from 'rxjs';
import { Evaluation } from '../models/diagnostic/evaluation';
import { HttpClient } from '@angular/common/http';
import { IService } from './service.interface';
import { AppService } from './app.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService extends AppService<Evaluation> implements IService<Evaluation> {

  public selfEvaluation: Evaluation;
  constructor(public http: HttpClient) {
    super(http, 'evaluations');
  }

  one(id: string): Observable<Evaluation> {
    return this.getOne(id)
  }

  all(f: any={}): Observable<Array<Evaluation>> {
    return this.getAll(f)
  }

  update(o: any): Observable<Evaluation> {
    return this.updateOne(o);
  }

  create(o: any): Observable<Evaluation> {
    return this.createOne(o)
  }
}