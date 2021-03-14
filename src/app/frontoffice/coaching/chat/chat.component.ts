import { ChatService } from './../../../services/main/chat.service';
import { ChatMessage } from './../../../models/main/chat_message';
import { ChatMessageService } from './../../../services/main/chat-message.service';
import { User } from './../../../models/main/user';
import { AuthService } from './../../../services/auth.service';
import { Chat } from './../../../models/main/chat';
import { Component, OnInit, Input } from '@angular/core';

import * as moment from 'moment';

import { io } from "socket.io-client";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {



  @Input() public chat: Chat = new Chat();
  public message: ChatMessage = new ChatMessage();
  public data: any;
  private socket: any;
  public ids: any = {};
  public isChating = false
  
  public commingFromOut;
  public to: User = new User();
  constructor(
    public auth: AuthService,
    private chatMessageService: ChatMessageService,
    private chatService: ChatService) {
    this.socket = io(this.auth.serverAddress, { auth: { token: this.auth.user.id } });
    this.socket.id = this.auth.user.id
  }

  ngOnInit(): void {

    let to = this.auth.user.id == 'd761c981-3502-49e4-a425-ef189f97e5bf' ? 'c33cda14-38c3-4670-9643-7d71c23fb098' : 'd761c981-3502-49e4-a425-ef189f97e5bf'
    this.auth.one(to).subscribe(user => {
      this.message.to = this.to = user
    })

    this.socket.on('connect', socket => {
      this.ids = { server: this.socket.id, client: this.message.to.apikey }
      this.startChat()

    });

    this.socket.on('chat-to-' + this.auth.user.id.split('-')[0], data => {
      this.chat.messages.push(data);
      this.scrollToEnd()

    });
  }
  startChat() {
    this.chatService.one('e2046104-7b22-490c-9a17-b1882f91cefd').subscribe(chat => {
      chat.messages = chat.messages.sort((x, y) => moment(x.createdAt).isAfter(y.createdAt) ? 1 : -1)
      this.message.chat = this.chat = chat;
      this.scrollToEnd()
    })
  }
  send() {
    this.message.from = this.auth.user;
    this.message.to = this.to;
    this.chatMessageService.create(this.message).subscribe(x => {
      this.message.message = ''
      this.chat.messages.push(this.message)
      this.scrollToEnd()
    })
  }

  scrollToEnd() {
    setTimeout(() => {
      var elem = document.getElementById('msg_card_body');
      elem.scrollTop = elem.scrollHeight;
    }, 500)
  }

}
