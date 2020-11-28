import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public isTab = 1;

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }


  switchtabTo(n: number) {
    this.isTab=n;
  }
  closeModal(ok){
    
  }
}
