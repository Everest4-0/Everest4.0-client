import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService<T> {

  protected url;
  public serverAdresss;
 // private serverAddress = 'http://localhost:9800';
  private serverAddress = 'https://everest40-server.azurewebsites.net';
  constructor(public http: HttpClient, private service: string) {
    this.url = `${this.serverAddress}/api/v1/${service.split('.').join('/')}`;

    this.serverAdresss = this.serverAddress;
  }

  protected getOne(s: string): Observable<any> {
    return this.http.get(this.url + '/' + s)
  }

  protected getAll(a: any): Observable<any> {
    let str = '';

    for (var key in a) {
      if (str != '') {
        str += "&";
      }
      str += key + "=" + encodeURIComponent(a[key]);
    }
    return this.http.get(this.url + '?' + str)
  }

  protected createOne(o: T): Observable<any> {
    return this.http.post(this.url, o)
  }

  protected updateOne(o: any): Observable<any> {
    return this.http.put(this.url, o)
  }

  protected deleteOne(o: T): Observable<any> {
    return this.http.delete(this.url + '/' + o)
  }
}
