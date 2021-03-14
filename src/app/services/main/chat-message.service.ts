import { IService } from './../service.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from './../app.service';
import { ChatMessage } from './../../models/main/chat_message';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatMessageService  extends AppService<ChatMessage> implements IService<ChatMessage> {

  public goal: ChatMessage;
  constructor(public http: HttpClient) {
    super(http, 'chats.messages');
  }

  one(id: string): Observable<ChatMessage> {
    return this.getOne(id)
  }

  all(f: any={}): Observable<Array<ChatMessage>> {
    return this.getAll(f)
  }

  update(o: any): Observable<ChatMessage> {
    return this.updateOne(o);
  }

  create(o: any): Observable<ChatMessage> {
    return this.createOne(o)
  }
}