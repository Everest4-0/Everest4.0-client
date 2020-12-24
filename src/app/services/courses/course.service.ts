import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IService } from './../service.interface';
import { Course } from 'app/models/course/course';
import { AppService } from './../app.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends AppService<Course> implements IService<Course>{

  public course: Course;

  constructor(public http: HttpClient) {
    super(http, 'courses.courses');
  }

  one(id: string): Observable<Course> {
    return this.getOne(id)
  }

  all(f: any={}): Observable<Array<Course>> {
    return this.getAll(f)
  }

  update(o: any): Observable<Course> {
    return this.updateOne(o);
  }

  create(o: any): Observable<Course> {
    return this.createOne(o)
  }
}
