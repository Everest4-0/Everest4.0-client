import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IService } from './../service.interface';
import { AppService } from './../app.service';
import { BudgetCategory } from './../../models/goal/budget-category';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BudgetCategoryService extends AppService<BudgetCategory> implements IService<BudgetCategory> {

  public category: BudgetCategory;
  constructor(public http: HttpClient) {
    super(http, 'budget-categories');
  }

  one(id: string): Observable<BudgetCategory> {
    return this.getOne(id)
  }

  all(f: any = {}): Observable<Array<BudgetCategory>> {
    return this.getAll(f)
  }

  update(o: any): Observable<BudgetCategory> {
    return this.updateOne(o);
  }

  create(o: any): Observable<BudgetCategory> {
    return this.createOne(o)
  }
}
