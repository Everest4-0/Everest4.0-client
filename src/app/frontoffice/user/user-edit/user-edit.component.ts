import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public isTab = 1;

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }


  switchtabTo(n: number) {
    this.isTab=n;
  }

}
