import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private socket: any;
  public data: any;

  public isChating = true
  public message = '123456789';
  constructor() {
  
  }

  ngOnInit(): void {
    
  }

  send() {

  }

}
