import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IService } from './../service.interface';
import { DataRoom } from './../../models/virtual_data_room/data_room';
import { AppService } from './../app.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataRoomService extends AppService<DataRoom> implements IService<DataRoom> {

  public selfEvaluation: DataRoom;
  constructor(public http: HttpClient) {
    super(http, 'vdrs');
  }

  one(id: string): Observable<DataRoom> {
    return this.getOne(id)
  }

  all(f: any={}): Observable<Array<DataRoom>> {
    return this.getAll(f)
  }

  update(o: any): Observable<DataRoom> {
    return this.updateOne(o);
  }

  create(o: any): Observable<DataRoom> {
    return this.createOne(o)
  }
}