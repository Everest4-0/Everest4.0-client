import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { User } from './../../../models/main/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {

 
  public user:User;

  public isTab = 1;
  //public user: User = this.auth.user;
  constructor(public userService:UserService,
              public route:ActivatedRoute) { }

  ngOnInit() {
    const id=this.route.snapshot.params['id'];
    this.userService.one(id).subscribe(user=>this.user=user);
  }


  switchtabTo(n: number) {
    this.isTab = n;
  }

}
