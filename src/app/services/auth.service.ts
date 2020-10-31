import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { Injectable } from '@angular/core';
import { IService } from './service.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService extends AppService<User> implements IService<any> {

  constructor(public http: HttpClient) {
    super(http, 'users');
  }

  authenticate(o: User): Observable<any> {
    return this.http.post(this.url + '/authenticate', o)
  }

  one(id: string): Observable<User> {
    return this.getOne(id)
  }

  all(f: any): Observable<Array<User>> {
    return this.getAll(f)
  }

  update(o: any): Observable<User> {
    return this.updateOne(o);
  }

  create(o: any): Observable<User> {
    return this.createOne(o)
  }
}
