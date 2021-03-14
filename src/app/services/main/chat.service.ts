import { HttpClient } from '@angular/common/http';
import { IService } from './../service.interface';
import { AppService } from './../app.service';
import { Chat } from './../../models/main/chat';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends AppService<Chat> implements IService<Chat> {

  public goal: Chat;
  constructor(public http: HttpClient) {
    super(http, 'chats');
  }

  one(id: string, a: any = {}): Observable<Chat> {
    return this.getOne(id, a)
  }

  all(f: any = {}): Observable<Array<Chat>> {
    return this.getAll(f)
  }

  update(o: any): Observable<Chat> {
    return this.updateOne(o);
  }

  create(o: any): Observable<Chat> {
    return this.createOne(o)
  }
}
