import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isDevMode } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
const apikey = ""
const serverAddress = isDevMode() ? 'http://localhost:9800' : 'http://185.247.119.207:9800';//
@Injectable({
  providedIn: 'root'
})

export class AppService<T> {
  static serverAddress = serverAddress;
  protected headers;
  protected url;
  public serverAddress = serverAddress;
  constructor(public http: HttpClient, private service: string) {
    this.url = `${this.serverAddress}/api/v1/${service.split('.').join('/')}`;
    
    try {
      let data = JSON.parse(localStorage.getItem("local_everest_key"));
      this.headers = new HttpHeaders({ apikey: environment.appKey, authorization: data.filter(o => o.key === 'current_user')[0].data.apikey })
    } catch (e) { }

  }
  get apikey() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.get('./angular.json', { headers });
  }
  protected getOne(s: string, a?: any): Observable<any> {
    let str = this.getQuery(a);
    return this.http.get(this.url + '/' + s + '?' + str, { 'headers': this.headers })
  }

  protected getAll(a: any): Observable<any> {
    let str = this.getQuery(a);
    return this.http.get(this.url + '?' + str, { 'headers': this.headers })
  }

  protected createOne(o: T): Observable<any> {
    return this.http.post(this.url, o, { 'headers': this.headers })
  }

  protected updateOne(o: any): Observable<any> {
    return this.http.put(this.url, o, { 'headers': this.headers })
  }

  protected deleteOne(id): Observable<any> {
    return this.http.delete(this.url + '/' + id, { 'headers': this.headers })
  }

  private getQuery(a: any) {
    let str = '';

    for (var key in a) {
      if (str !== '') {
        str += '&';
      }
      str += key + '=' + encodeURIComponent(a[key]);
    }

    return str;
  }
}
