import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IService } from './service.interface';
import { Injectable } from '@angular/core';
import { Answer } from 'app/models/quiz/answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService extends AppService<Answer> implements IService<Answer>{

  public answer: Answer;

  constructor(public http: HttpClient) {
    super(http, 'answers');
  }

  one(id: string): Observable<Answer> {
    return this.getOne(id)
  }

  all(f: any={}): Observable<Array<Answer>> {
    return this.getAll(f)
  }

  update(o: any): Observable<Answer> {
    return this.updateOne(o);
  }

  create(o: any): Observable<Answer> {
    return this.createOne(o)
  }
}