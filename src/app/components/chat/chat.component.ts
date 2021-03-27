import { Chat } from './../../models/main/chat';
import { ChatService } from '../../services/main/chat.service';
import { ChatMessage } from '../../models/main/chat_message';
import { ChatMessageService } from '../../services/main/chat-message.service';
import { User } from '../../models/main/user';
import { AuthService } from '../../services/auth.service';
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
  @Input() public isCoach = false;
  @Input() public to: User = new User();
  @Input() public chats: Array<ChatMessage> = [];
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
      debugger
      //let chat=this.chats.filter(x=>x.id==data.chatId)[0].messages.push(data)
      if (this.chat.id == data.chatId) {
        this.chat.messages.push(data);
      }
      this.scrollToEnd()
    });
  }
  startChat(chat = null) {

    if (chat !== null && chat.id !== undefined) {
      this.chat = chat
    }
    if (this.chat.id == undefined) return;
    this.chatService.one(this.chat.id).subscribe(chat => {
      if (this.to.id !== undefined) {
        chat.to = this.to;
        chat.from = this.auth.user;
      }
      chat.messages = chat.messages.sort((x, y) => moment(x.createdAt).isAfter(y.createdAt) ? 1 : -1)
      this.chat = chat;
      this.scrollToEnd()
    })
  }
  send() {

    this.message.from = this.auth.user;
    this.message.to = this.chat.to;
    this.message.chat = this.chat
    this.chatMessageService.create(this.message).subscribe(x => {
      this.chat.messages.push(x)
      this.message.message = ''
      this.scrollToEnd()
    })
  }

  scrollToEnd() {
    setTimeout(() => {
      const elem = document.getElementById('msg_card_body');
      if (elem !== null) {
        elem.scrollTop = elem.scrollHeight;
      }
    }, 500)
  }

  openChat() {
    this.chat = this.isCoach ? new Chat() : this.chat;
    this.isChating = true
    this.startChat();
  }

  isMine(message) {

    if (message.from == undefined) {
      return false;
    }
    return this.auth.user.id !== message.from.id
  }
}
