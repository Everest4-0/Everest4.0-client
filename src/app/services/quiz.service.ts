import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IService } from './service.interface';
import { Injectable } from '@angular/core';
import { Quiz } from 'app/models/quiz/quiz';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService extends AppService<Quiz> implements IService<Quiz>{
  
  public quiz: Quiz;

  constructor(public http: HttpClient) {
    super(http, 'quizes');
   
  }

  one(id: string): Observable<Quiz> {
    return this.getOne(id)
  }

  all(f: any={}): Observable<Array<Quiz>> {
    return this.getAll(f)
  }

  update(o: any): Observable<Quiz> {
    return this.updateOne(o);
  }

  create(o: any): Observable<Quiz> {
    return this.createOne(o)
  }
}
