import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IService } from './service.interface';
import { AppService } from './app.service';
import { ToDo } from './../models/goal/todo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService  extends AppService<ToDo> implements IService<ToDo> {

  public goal: ToDo;
  constructor(public http: HttpClient) {
    super(http, 'todos');
  }

  one(id: string): Observable<ToDo> {
    return this.getOne(id)
  }

  all(f: any={}): Observable<Array<ToDo>> {
    return this.getAll(f)
  }

  update(o: any): Observable<ToDo> {
    return this.updateOne(o);
  }

  create(o: any): Observable<ToDo> {
    return this.createOne(o)
  }
}