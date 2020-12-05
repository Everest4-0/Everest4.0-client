import { ToastService } from 'ng-uikit-pro-standard';
import { User } from './../models/user';
import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private userService: UserService,
    private toast: ToastService) { }

  ngOnInit() {
  }

  upgrade(to: string) {
    this.userService.upgrade(this.auth.user, to).subscribe((user: User) => {

      this.toast.success('O Seu plano foi alterado para ' + to + ' com successo', 'Sucesso', {
        timeOut: 10000,
        progressBar: true,
      })
      this.auth.authenticate(user)
    })
  }

}
