import { Observable } from 'rxjs';
import { Enrollment } from './../../models/course/enrollment';
import { HttpClient } from '@angular/common/http';
import { IService } from './../service.interface';
import { AppService } from './../app.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService  extends AppService<Enrollment> implements IService<Enrollment>{

  public enrollment: Enrollment;

  constructor(public http: HttpClient) {
    
    super(http, 'courses.enrollments');
  }

  one(id: string): Observable<Enrollment> {
    return this.getOne(id)
  }

  all(f: any={}): Observable<Array<Enrollment>> {
    return this.getAll(f)
  }

  update(o: any): Observable<Enrollment> {
    return this.updateOne(o);
  }

  create(o: any): Observable<Enrollment> {
    return this.createOne(o)
  }
}
