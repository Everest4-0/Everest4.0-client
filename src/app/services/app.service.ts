import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService<T,s> {

  private identity = ''
  private url;
  private serverAddress='0.0.0.0:9800';
  constructor(public http: HttpClient) {
    this.url=`http://${this.serverAddress}/api/v1/${s}`
  }

  getOne(s: string): Observable<any> {
    return this.http.get(this.url)
  }

  getAll(a: any): Observable<any> {
    return this.http.get(this.url)
  }

  createOne(o: T): Observable<any> {
    return this.http.get(this.url)
  }

  updateOne(o: T): Observable<any> {
    return this.http.get(this.url)
  }

  deleteOne(o: T): Observable<any> {
    return this.http.get(this.url)
  }
}
