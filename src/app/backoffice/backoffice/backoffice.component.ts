import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private permissionsService: NgxPermissionsService
  ) { }

  ngOnInit(): void {

    if (this.auth.user) {
      this.permissionsService.loadPermissions(this.auth.user.roles);
    }
  }

}
