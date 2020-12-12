import { User } from 'app/models/main/user';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  @Input() user;
  public isTab = 1;
  //public user: User = this.auth.user;
  constructor(public auth: AuthService) { }

  ngOnInit() {
  }


  switchtabTo(n: number) {
    this.isTab = n;
  }
}
