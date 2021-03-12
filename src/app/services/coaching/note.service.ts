import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Note } from './../../models/coaching/note';
import { IService } from './../service.interface';
import { AppService } from './../app.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService extends AppService<Note> implements IService<Note> {

  
  constructor(public http: HttpClient) {
    super(http, 'coaching.notes');
  }

  one(id: string): Observable<Note> {
    return this.getOne(id)
  }

  all(f: any={}): Observable<Array<Note>> {
    return this.getAll(f)
  }

  update(o: any): Observable<Note> {
    return this.updateOne(o);
  }

  create(o: any): Observable<Note> {
    return this.createOne(o)
  }
}
