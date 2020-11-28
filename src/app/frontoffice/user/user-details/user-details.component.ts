import { User } from 'app/models/user';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public isTab = 1;
  public user: User = this.auth.user;
  constructor(public auth: AuthService) { }

  ngOnInit() {
  }


  switchtabTo(n: number) {
    this.isTab = n;
  }
}
