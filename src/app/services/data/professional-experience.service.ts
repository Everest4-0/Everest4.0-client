import { IService } from './../service.interface';
import { AppService } from './../app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalExperienceService extends AppService<any> implements IService<any> {

  public selfEvaluation: any;
  constructor(public http: HttpClient) {
    super(http, 'datas.professional-experiences');
  }

  one(id: string): Observable<any> {
    return this.getOne(id)
  }

  all(f: any={}): Observable<Array<any>> {
    return this.getAll(f)
  }

  update(o: any): Observable<any> {
    return this.updateOne(o);
  }

  create(o: any): Observable<any> {
    return this.createOne(o)
  }
}