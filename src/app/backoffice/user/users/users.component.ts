import { User } from './../../../models/main/user';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<User> = []

  @Input('id') id: String;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.userService.all({}).subscribe(data =>{
      
      this.users=data
      
      console.log(this.users);
    
    });

  }

}
