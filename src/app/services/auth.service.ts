import { StorageServices } from './storage.service';

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

  public user: User = new User();
  constructor(public http: HttpClient, private store: StorageServices) {
    super(http, 'users');
    this.user = store.get('current_user').data;
  }

  authenticate(o: User): Observable<any> {
    const service = this.http.post(this.url + '/authenticate', o);
    service.subscribe((u: User) => {
      this.store.save('current_user', u);
    })
    return service;
  }

  signOut(): void {
    this.store.remove('current_user')
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
