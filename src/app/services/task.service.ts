import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IService } from './service.interface';
import { Task } from './../models/goal/task';
import { AppService } from './app.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends AppService<Task> implements IService<Task> {

  public goal: Task;
  constructor(public http: HttpClient) {
    super(http, 'tasks');
  }

  one(id: string): Observable<Task> {
    return this.getOne(id)
  }

  all(f: any = {}): Observable<Array<Task>> {
    return this.getAll(f)
  }

  update(task: any): Observable<Task> {
    const o = { ...task, ...{ goal: null, goalId: task.goalId ?? task.goal.id } };
    return this.updateOne(o);
  }

  create(task: any): Observable<Task> {
    const o = { ...task, ...{ goal: null, goalId: task.goalId ?? task.goal.id } };
    return this.createOne(o)
  }
}
