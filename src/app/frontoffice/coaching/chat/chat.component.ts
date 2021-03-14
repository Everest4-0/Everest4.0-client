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
  @Input() public isCoach: boolean;
  @Input() public to: User = new User();

  public message: ChatMessage = new ChatMessage();
  public data: any;
  private socket: any;
  public ids: any = {};
  public isChating = false

  public commingFromOut;
  constructor(
    public auth: AuthService,
    private chatMessageService: ChatMessageService,
    private chatService: ChatService) {
    this.socket = io(this.auth.serverAddress, { auth: { token: this.auth.user.id } });
    this.socket.id = this.auth.user.id
  }

  ngOnInit(): void {

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
    this.chatService.one(this.chat.id).subscribe(chat => {
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
