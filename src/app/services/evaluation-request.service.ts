import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IService } from './service.interface';
import { EvaluationRequest } from '../models/diagnostic/evaluation-request';
import { AppService } from './app.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EvaluationRequestService extends AppService<EvaluationRequest> implements IService<EvaluationRequest> {

  public selfEvaluation: EvaluationRequest;
  constructor(public http: HttpClient) {
    super(http, 'evaluation-requests');
  }

  one(id: string): Observable<EvaluationRequest> {
    return this.getOne(id)
  }

  all(f: any={}): Observable<Array<EvaluationRequest>> {
    return this.getAll(f)
  }

  update(o: any): Observable<EvaluationRequest> {
    return this.updateOne(o);
  }

  create(o: any): Observable<EvaluationRequest> {
    return this.createOne(o)
  }
}