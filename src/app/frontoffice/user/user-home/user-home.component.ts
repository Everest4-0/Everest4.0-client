import { User } from 'app/models/main/user';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  public isTab = 1;
  public user: User = this.auth.user;
  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.one(this.auth.user.id).subscribe(user => this.user = user)
  }


  switchtabTo(n: number) {
    this.isTab = n;
  }
}
