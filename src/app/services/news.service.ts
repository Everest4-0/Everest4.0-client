import { Observable } from 'rxjs';
import { IService } from './service.interface';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService  extends AppService<any> implements IService<any> {

  constructor(public http: HttpClient) {
    super(http, 'news');
  }

  one(id: string): Observable<any> {
    return this.getOne(id)
  }

  all(f: any={}): Observable<any> {
    return this.getAll(f)
  }

  update(o: any): Observable<any> {
    return this.updateOne(o);
  }

  create(o: any): Observable<any> {
    return this.createOne(o)
  }
}
