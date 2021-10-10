import { AuthService } from 'app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { User } from './../../../models/main/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.scss']
})
export class DetailsUserComponent implements OnInit {


  public user: User;

  public isTab = 2;
  constructor(
    public auth: AuthService,
    public userService: UserService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.userService.one(id).subscribe((user: User) => {
      this.user = Object.assign(new User(), user)      
    });

  }

}
