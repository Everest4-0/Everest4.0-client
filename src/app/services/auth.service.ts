import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { StorageServices } from './storage.service';

import { User } from 'app/models/main/user';
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

  constructor(
    public http: HttpClient,
    private store: StorageServices,
    private permissionsService: NgxPermissionsService) {
    super(http, 'users');
    let u = store.get<User>('current_user').data
    if (u === undefined)
      this.user = undefined
    else
      this.user = Object.assign(new User(), u);
  }

  authenticate(o: User, callback): Observable<any> {
    const service = this.http.post(this.url + '/authenticate', o);
    service.subscribe((u: User) => {
      this.one(u.id).subscribe((u: User) => {
        u = Object.assign(new User(), u)
        this.store.remove('current_user')
        this.store.save('current_user', u)
      })
      this.one(u.id).subscribe(callback)
    })
    return service;
  }

  signOut(): void {
    this.store.remove('current_user');
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
