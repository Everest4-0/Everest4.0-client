import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class GenericService extends AppService<any> {

  constructor(public http: HttpClient) {
    super(http, '');
  }

  activitiesSectors(): Observable<any> {
    this.url = `${this.serverAddress}/api/v1/mains/consts/activities-sectors`;
    return this.getAll()
  }
}