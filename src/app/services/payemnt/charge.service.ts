import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IService } from './../service.interface';
import { Charge } from './../../models/payment/charge';
import { AppService } from './../app.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChargeService extends AppService<Charge> implements IService<Charge> {

  public category: Charge;
  constructor(public http: HttpClient) {
    super(http, 'payments.charges');
  }

  one(id: string): Observable<Charge> {
    return this.getOne(id)
  }

  all(f: any = {}): Observable<Array<Charge>> {
    return this.getAll(f)
  }

  update(o: any): Observable<Charge> {
    return this.updateOne(o);
  }

  create(o: any): Observable<Charge> {
    return this.createOne(o)
  }
}
