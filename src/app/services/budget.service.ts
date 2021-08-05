import { IService } from './service.interface';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Budget } from './../models/goal/budget';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BudgetService extends AppService<Budget> implements IService<Budget> {

  public goal: Budget;
  constructor(public http: HttpClient) {
    super(http, 'budgets');
  }

  one(id: string): Observable<Budget> {
    return this.getOne(id)
  }

  all(f: any = {}): Observable<Array<Budget>> {
    return this.getAll(f)
  }

  update(o: any): Observable<Budget> {
    return this.updateOne(o);
  }

  create(o: Budget): Observable<Budget> {
    return this.createOne(o.clone() as Budget)
  }
}
