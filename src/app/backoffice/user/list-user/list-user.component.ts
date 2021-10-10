import { UserService } from './../../../services/user.service';
import { User } from './../../../models/main/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  public users: Array<User> = []
  public usersPaginated : Array<User> = []

  onChangePage = (users) => this.usersPaginated = users;

  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.userService.all({}).subscribe(data => this.users = data);
  }
  
}
