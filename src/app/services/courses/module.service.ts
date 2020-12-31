import { Observable } from 'rxjs';
import { IService } from './../service.interface';
import { HttpClient } from '@angular/common/http';
import { Module } from './../../models/course/module';
import { AppService } from './../app.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModuleService   extends AppService<Module> implements IService<Module>{

  public Module: Module;

  constructor(public http: HttpClient) {
    
    super(http, 'courses.modules');
  }

  one(id: string): Observable<Module> {
    return this.getOne(id)
  }

  all(f: any={}): Observable<Array<Module>> {
    return this.getAll(f)
  }

  update(o: any): Observable<Module> {
    return this.updateOne(o);
  }

  create(o: any): Observable<Module> {
    return this.createOne(o)
  }
}

