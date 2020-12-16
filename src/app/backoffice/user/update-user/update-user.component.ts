import { ActivatedRoute } from '@angular/router';
import { User } from './../../../models/main/user';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  user: User;

  constructor(private userService: UserService,
              private route: ActivatedRoute) { 
              }
  
  ngOnInit(): void {

    let id = this.route.snapshot.params['id'];
    //alert(id);

    this.userService.one(id).subscribe(data => this.user=data);

  }


  teste(){
    //alert(this.id);
    //alert(this.user.email);

  }
}
