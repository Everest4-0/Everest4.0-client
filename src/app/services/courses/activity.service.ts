import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Activity } from './../../models/course/activity';
import { IService } from './../service.interface';
import { AppService } from './../app.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivityService  extends AppService<Activity> implements IService<Activity>{

  public activity: Activity;

  constructor(public http: HttpClient) {
    super(http, 'courses.activities');
  }

  one(id: string): Observable<Activity> {
    return this.getOne(id)
  }

  all(f: any={}): Observable<Array<Activity>> {
    return this.getAll(f)
  }

  update(o: any): Observable<Activity> {
    return this.updateOne(o);
  }

  create(o: any): Observable<Activity> {
    return this.createOne(o)
  }

  addUserAnswer(o:any): Observable<any> {
    debugger
    return this.http.post(this.url+'/add_user_answer', o)
  }
  getUserAnswer(a:any): Observable<any> {
    let str = '';
debugger
    for (var key in a) {
      if (str != '') {
        str += "&";
      }
      str += key + "=" + encodeURIComponent(a[key]);
    }
    return this.http.get(this.url+'/user_answer' + '?' + str)
  }
//  add_user_answer
}
