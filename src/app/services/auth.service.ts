import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { StorageServices } from './storage.service';
import 'rxjs/add/operator/catch';
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

  authorizationKey = () => this.user.apikey;

  authenticate(o: User, callback): Observable<any> {
    const service = this.http.post(this.url + '/authenticate', o);
    service.subscribe((u: User) => {
      
      switch (parseInt(u.code)) {
        case 401:
          u.message = 'Endereço de e-mail ou palavra-passe esta incorretas.'
          callback(u)
          break;
        default:
          if (u.apikey) {

            u = Object.assign(new User(), u)
            this.store.remove('current_user')
            this.store.save('current_user', u)
            callback(u)
            window.open('./', '_self')

          } else {
            u.message = 'Infelizmente não reconhecemos esta conta.'
            callback(u)
          }

      }
    })
    return service;
  }

  signOut(): void {
    localStorage.clear();
  }

  one(id: string): Observable<User> {
    return this.getOne(id)
  }

  all(f: any={}): Observable<Array<User>> {
    return this.getAll(f)
  }

  update(o: any): Observable<User> {
    return this.updateOne(o);
  }

  create(o: any): Observable<User> {
    return this.createOne(o)
  }
}
