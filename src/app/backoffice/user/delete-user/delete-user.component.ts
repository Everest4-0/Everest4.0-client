import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
