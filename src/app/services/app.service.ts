import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService<T> {

  private identity = ''
  protected url;
  private serverAddress = '0.0.0.0:9800';
  constructor(public http: HttpClient, private service: string) {
    this.url = `http://${this.serverAddress}/api/v1/${service}`
  }

  protected getOne(s: string): Observable<any> {
    return this.http.get(this.url + '/' + s)
  }

  protected getAll(a: any): Observable<any> {
    return this.http.get(this.url)
  }

  protected createOne(o: T): Observable<any> {
    return this.http.post(this.url, o)
  }

  protected updateOne(o: any): Observable<any> {
    return this.http.put(this.url + '/' + o.id, o)
  }

  protected deleteOne(o: T): Observable<any> {
    return this.http.delete(this.url + '/' + o)
  }
}
